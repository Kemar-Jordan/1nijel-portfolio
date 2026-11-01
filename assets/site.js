(function () {
  'use strict';

  var CONTENT = window.NIJEL_CONTENT || { lanes: {}, videos: [] };

  var THEMES = {
    blue: { block: 'bg-blue text-white', chip: 'bg-white/15', muted: 'text-white/70', icon: '', soft: 'bg-blue-sky text-blue', poster: 'from-blue to-blue-deep text-white', disc: 'bg-gold text-ink' },
    gold: { block: 'bg-gold text-ink', chip: 'bg-ink/10', muted: 'text-ink/60', icon: '', soft: 'bg-gold-cream text-ink', poster: 'from-gold to-[#FFB000] text-ink', disc: 'bg-ink text-gold' },
    ink: { block: 'bg-ink text-white', chip: 'bg-white/10', muted: 'text-white/60', icon: 'text-gold', soft: 'bg-paper text-ink', poster: 'from-[#262A33] to-ink text-white', disc: 'bg-gold text-ink' },
    sky: { block: 'bg-blue-sky text-blue', chip: 'bg-blue/10', muted: 'text-blue/70', icon: '', soft: 'bg-blue-sky text-blue', poster: 'from-blue-sky to-[#C9D4FF] text-blue', disc: 'bg-blue text-white' }
  };

  var ICONS = {
    football: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7.5l4.2 3-1.6 5h-5.2l-1.6-5z"/><path d="M12 7.5V2.5M16.2 10.5l4.8-1.5M14.6 15.5l3 4M9.4 15.5l-3 4M7.8 10.5L3 9"/>',
    diaspora: '<path d="M12 21V10"/><path d="M12 10c-1.5-3-4.5-4-8-3.5 1.5 1 2.5 2.5 3 4M12 10c1.5-3 4.5-4 8-3.5-1.5 1-2.5 2.5-3 4M12 10c-.5-3.5 1-6 3.5-7.5M12 10c.5-3.5-1-6-3.5-7.5"/><path d="M3 21h18"/>',
    skits: '<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 20.5l1.6-5.2A8.4 8.4 0 1 1 21 11.5z"/><path d="M8.5 10h.01M15.5 10h.01"/><path d="M8.5 13.5a4.5 4.5 0 0 0 7 0"/>',
    vlogs: '<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.8l1.5-2h6.4l1.5 2h1.8A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><circle cx="12" cy="13" r="3.8"/>'
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function svg(paths, className) {
    var wrap = document.createElement('span');
    wrap.innerHTML = '<svg class="' + className + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
    return wrap.firstChild;
  }

  function playIcon() {
    return svg('<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>', 'ml-1 h-7 w-7');
  }

  // Turns a pasted Instagram / YouTube link into something we can embed.
  function parseVideo(url) {
    if (typeof url !== 'string') return null;
    var ig = url.match(/^https:\/\/(?:www\.)?instagram\.com\/(?:[A-Za-z0-9_.]+\/)?(reel|reels|p|tv)\/([A-Za-z0-9_-]{5,40})/);
    if (ig) {
      var kind = ig[1] === 'p' ? 'p' : 'reel';
      return {
        platform: 'instagram',
        name: 'Instagram',
        id: ig[2],
        href: 'https://www.instagram.com/' + kind + '/' + ig[2] + '/',
        embed: 'https://www.instagram.com/' + kind + '/' + ig[2] + '/embed/'
      };
    }
    var yt = url.match(/^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (yt) {
      return {
        platform: 'youtube',
        name: 'YouTube',
        id: yt[1],
        href: 'https://www.youtube.com/shorts/' + yt[1],
        embed: 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?autoplay=1&playsinline=1&rel=0&modestbranding=1',
        thumb: 'https://i.ytimg.com/vi/' + yt[1] + '/hq720.jpg'
      };
    }
    return null;
  }

  function safeCover(path) {
    return typeof path === 'string' && /^[A-Za-z0-9_\-./]+\.(?:jpe?g|png|webp|avif)$/i.test(path) && path.indexOf('..') === -1 ? path : '';
  }

  // Valid clips, in file order, with their parsed link attached.
  function getVideos() {
    return (CONTENT.videos || []).reduce(function (list, video) {
      var parsed = video && parseVideo(video.url);
      if (!parsed || !CONTENT.lanes[video.lane] || !video.title) {
        if (window.console) console.warn('[1nijel] Skipped a clip in assets/videos.js. Check its url, lane and title:', video);
        return list;
      }
      list.push({
        lane: video.lane,
        title: String(video.title),
        format: video.format ? String(video.format) : '',
        featured: video.featured === true,
        cover: safeCover(video.cover),
        source: parsed
      });
      return list;
    }, []);
  }

  // Fills a 9:16 frame with a poster that loads the real player only when tapped.
  function mountPlayer(frame, video, theme) {
    var t = THEMES[theme] || THEMES.blue;
    var src = video.source;
    var label = 'Play ' + video.title + ' from ' + src.name;
    var button = el('button', 'group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-4 text-center focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-gold');
    button.type = 'button';
    button.setAttribute('aria-label', label);

    var coverSrc = video.cover || src.thumb || '';
    if (coverSrc) {
      var img = el('img', 'absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105');
      img.src = coverSrc;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      button.appendChild(img);
      button.appendChild(el('span', 'absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent'));
    } else {
      button.appendChild(el('span', 'absolute inset-0 bg-gradient-to-br ' + t.poster));
      var lane = CONTENT.lanes[video.lane];
      if (lane && ICONS[video.lane]) {
        var bgIcon = svg(ICONS[video.lane], 'absolute -bottom-6 -right-6 h-40 w-40 opacity-15');
        button.appendChild(bgIcon);
      }
    }

    if (video.format) {
      button.appendChild(el('span', 'absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur', video.format));
    }

    var disc = el('span', 'relative flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-110 ' + t.disc);
    disc.appendChild(playIcon());
    button.appendChild(disc);
    button.appendChild(el('span', 'relative rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink', 'Tap to play'));

    button.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = src.embed;
      iframe.title = video.title + ' on ' + src.name;
      iframe.className = 'absolute inset-0 h-full w-full bg-white';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      frame.replaceChildren(iframe);
      iframe.focus();
    }, { once: true });

    frame.replaceChildren(button);
  }

  // Scroll reveal; call Nijel.reveal(root) after adding new .reveal elements.
  var revealer = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;

  function reveal(root) {
    (root || document).querySelectorAll('.reveal:not([data-revealing])').forEach(function (node) {
      node.setAttribute('data-revealing', '');
      if (revealer) revealer.observe(node);
      else node.classList.add('is-in');
    });
  }

  function imageFallbacks(root) {
    (root || document).querySelectorAll('img.photo').forEach(function (img) {
      function showFallback() {
        img.classList.add('hidden');
        var fb = document.getElementById(img.getAttribute('data-fallback'));
        if (fb) { fb.classList.remove('hidden'); fb.classList.add('flex'); }
      }
      if (img.complete && img.naturalWidth === 0) showFallback();
      else img.addEventListener('error', showFallback, { once: true });
    });
  }

  // Header + mobile menu
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  var header = document.getElementById('site-header');

  function updateHeader() {
    var solid = window.scrollY > 12 || (toggle && toggle.getAttribute('aria-expanded') === 'true');
    header.classList.toggle('bg-paper/85', solid);
    header.classList.toggle('backdrop-blur-md', solid);
    header.classList.toggle('border-line', solid);
    header.classList.toggle('border-transparent', !solid);
  }

  if (toggle && menu) {
    var bars = {
      top: toggle.querySelector('[data-bar="top"]'),
      mid: toggle.querySelector('[data-bar="mid"]'),
      bot: toggle.querySelector('[data-bar="bot"]')
    };
    var setMenu = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('hidden', !open);
      bars.top.classList.toggle('-translate-y-1.5', !open);
      bars.top.classList.toggle('rotate-45', open);
      bars.bot.classList.toggle('translate-y-1.5', !open);
      bars.bot.classList.toggle('-rotate-45', open);
      bars.mid.classList.toggle('opacity-0', open);
      document.body.classList.toggle('overflow-hidden', open);
      updateHeader();
    };
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('.mobile-link').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  if (header) {
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  window.Nijel = {
    content: CONTENT,
    themes: THEMES,
    icons: ICONS,
    el: el,
    svg: svg,
    getVideos: getVideos,
    mountPlayer: mountPlayer,
    reveal: reveal,
    imageFallbacks: imageFallbacks
  };

  imageFallbacks();
  reveal();
})();
