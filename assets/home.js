(function () {
  'use strict';
  var N = window.Nijel;
  var videos = N.getVideos();

  // Clip counts on the lane cards
  document.querySelectorAll('.lane-count').forEach(function (node) {
    var lane = node.getAttribute('data-lane');
    var count = videos.filter(function (v) { return v.lane === lane; }).length;
    node.textContent = count ? 'Handpicked clips' : 'New drops soon';
  });

  // Flagship drops: clips marked featured, topped up with lane shortcuts
  var featured = videos.filter(function (v) { return v.featured; }).slice(0, 2);
  var fallbacks = [
    { lane: 'football', title: 'Matchday Street Interview' },
    { lane: 'skits', title: 'Living Room POV' }
  ];

  document.querySelectorAll('.featured-slot').forEach(function (slot, i) {
    var frame = slot.querySelector('.slot-frame');
    var titleEl = slot.querySelector('.slot-title');
    var tagEl = slot.querySelector('.slot-platform');
    var video = featured[i];

    if (video) {
      titleEl.textContent = video.title;
      tagEl.textContent = N.content.lanes[video.lane].short;
      N.mountPlayer(frame, video, 'blue');
      return;
    }

    var fb = fallbacks[i] || fallbacks[0];
    var lane = N.content.lanes[fb.lane];
    titleEl.textContent = fb.title;
    tagEl.textContent = lane.short;

    var link = N.el('a', 'group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4 text-center text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-gold');
    link.href = fb.lane + '.html';
    link.setAttribute('aria-label', 'See all ' + lane.name + ' clips');
    link.appendChild(N.el('span', 'absolute inset-0 bg-gradient-to-b from-blue/40 via-blue-deep to-blue-deep'));
    link.appendChild(N.svg(N.icons[fb.lane], 'absolute -bottom-6 -right-6 h-40 w-40 opacity-10'));
    var disc = N.el('span', 'relative flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform group-hover:scale-110 sm:h-20 sm:w-20');
    disc.appendChild(N.svg('<path d="M5 12h14M13 6l6 6-6 6"/>', 'h-7 w-7'));
    link.appendChild(disc);
    link.appendChild(N.el('span', 'relative rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink', 'Open ' + lane.short + ' lane'));
    frame.replaceChildren(link);
  });

  // Category filters
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.cat-card');
  var status = document.getElementById('filter-status');
  var ACTIVE = ['bg-ink', 'text-white'];
  var IDLE = ['text-mute', 'hover:text-ink', 'hover:bg-paper'];

  function applyFilter(value, announce) {
    var shown = 0;
    cards.forEach(function (card) {
      var match = value === 'all' || card.getAttribute('data-category') === value;
      card.hidden = !match;
      if (match) shown++;
    });
    filterBtns.forEach(function (btn) {
      var active = btn.getAttribute('data-filter') === value;
      btn.setAttribute('aria-pressed', String(active));
      ACTIVE.forEach(function (c) { btn.classList.toggle(c, active); });
      IDLE.forEach(function (c) { btn.classList.toggle(c, !active); });
    });
    if (announce) status.textContent = 'Showing ' + shown + (shown === 1 ? ' lane' : ' lanes');
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      cards.forEach(function (card) { card.classList.add('is-in'); });
      applyFilter(btn.getAttribute('data-filter'), true);
    });
  });
  applyFilter('all', false);

  // Active nav link
  var navLinks = document.querySelectorAll('.nav-link');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id === 'top' ? 'about' : entry.target.id === 'featured' ? 'categories' : entry.target.id;
        navLinks.forEach(function (link) {
          var current = link.getAttribute('href').split('#')[1] === id;
          link.classList.toggle('bg-white', current);
          link.classList.toggle('text-ink', current);
          link.classList.toggle('text-mute', !current);
          if (current) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'categories', 'featured', 'collab'].forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }
})();
