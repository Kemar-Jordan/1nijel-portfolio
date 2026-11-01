(function () {
  'use strict';
  var N = window.Nijel;
  var el = N.el;
  var root = document.getElementById('lane-root');
  var key = document.body.getAttribute('data-lane');
  var lane = N.content.lanes[key];
  if (!root || !lane) return;

  var t = N.themes[lane.theme] || N.themes.blue;
  var clips = N.getVideos().filter(function (v) { return v.lane === key; });
  var instagram = N.content.instagram;

  function external(a) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.appendChild(el('span', 'sr-only', ' (opens in a new tab)'));
    return a;
  }

  // ---------- Hero ----------
  var hero = el('section', 'pt-20 sm:pt-24');
  hero.setAttribute('aria-labelledby', 'lane-title');
  var heroWrap = el('div', 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8');

  var crumbs = el('nav', 'mb-4 text-sm font-medium text-mute');
  crumbs.setAttribute('aria-label', 'Breadcrumb');
  var crumbList = el('ol', 'flex flex-wrap items-center gap-2');
  var home = el('a', 'hover:text-ink', 'Home'); home.href = 'index.html';
  var lanesLink = el('a', 'hover:text-ink', 'Lanes'); lanesLink.href = 'index.html#categories';
  var here = el('span', 'font-semibold text-ink', lane.short); here.setAttribute('aria-current', 'page');
  [home, lanesLink, here].forEach(function (node, i) {
    var li = el('li', 'flex items-center gap-2');
    if (i) li.appendChild(el('span', 'text-line', '/'));
    li.appendChild(node);
    crumbList.appendChild(li);
  });
  crumbs.appendChild(crumbList);
  heroWrap.appendChild(crumbs);

  var heroGrid = el('div', 'grid gap-4 lg:grid-cols-12');

  var banner = el('div', 'relative overflow-hidden rounded-[2rem] p-7 shadow-card sm:p-10 lg:col-span-8 lg:p-12 ' + t.block);
  banner.appendChild(N.svg(N.icons[key], 'pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 opacity-10 sm:h-80 sm:w-80'));
  var bannerTop = el('div', 'relative flex items-center gap-3');
  bannerTop.appendChild(el('span', 'font-mono text-xs font-semibold ' + t.muted, lane.number));
  bannerTop.appendChild(el('span', 'rounded-full px-3 py-1 text-xs font-semibold ' + t.chip, lane.tag));
  banner.appendChild(bannerTop);
  var iconTile = el('span', 'relative mt-8 inline-flex ' + t.icon);
  iconTile.appendChild(N.svg(N.icons[key], 'h-14 w-14'));
  banner.appendChild(iconTile);
  var h1 = el('h1', 'relative mt-6 font-display text-[clamp(2.75rem,8vw,5.5rem)] font-black leading-[0.92] tracking-tightest', lane.name);
  h1.id = 'lane-title';
  banner.appendChild(h1);
  banner.appendChild(el('p', 'relative mt-6 max-w-2xl text-lg leading-relaxed opacity-90', lane.intro));
  var formatList = el('ul', 'relative mt-8 flex flex-wrap gap-2');
  formatList.setAttribute('aria-label', 'Formats');
  lane.formats.forEach(function (f) {
    formatList.appendChild(el('li', 'rounded-full px-3 py-1.5 text-sm font-semibold ' + t.chip, f));
  });
  banner.appendChild(formatList);
  heroGrid.appendChild(banner);

  var side = el('aside', 'flex flex-col gap-4 lg:col-span-4');
  side.setAttribute('aria-label', 'Lane stats');

  var follow = el('div', 'flex flex-1 flex-col justify-between gap-6 rounded-[2rem] bg-ink p-7 text-white shadow-card');
  var followText = el('div');
  followText.appendChild(el('p', 'font-display text-2xl font-extrabold leading-tight tracking-tight', 'New ' + lane.short.toLowerCase() + ' clips drop on Instagram first.'));
  followText.appendChild(el('p', 'mt-2 text-sm text-white/60', 'Follow @1nijel so you catch them first.'));
  follow.appendChild(followText);
  var followBtn = el('a', 'inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink', 'Follow on Instagram ↗');
  followBtn.href = instagram;
  follow.appendChild(external(followBtn));
  side.appendChild(follow);
  heroGrid.appendChild(side);

  heroWrap.appendChild(heroGrid);
  hero.appendChild(heroWrap);
  root.appendChild(hero);

  // ---------- Clips ----------
  var section = el('section', 'scroll-mt-16 py-16 sm:py-20');
  section.id = 'clips';
  section.setAttribute('aria-labelledby', 'clips-title');
  var wrap = el('div', 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8');

  var head = el('div', 'reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between');
  var headText = el('div');
  headText.appendChild(el('p', 'font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue', 'The clips'));
  var h2 = el('h2', 'mt-3 font-display text-4xl font-black leading-[0.95] tracking-tightest sm:text-5xl', 'Every ' + lane.short.toLowerCase() + ' drop.');
  h2.id = 'clips-title';
  headText.appendChild(h2);
  var more = el('p', 'mt-4 max-w-md text-base text-mute', 'Some of my work. There is a lot more on ');
  var moreLink = el('a', 'font-semibold text-ink underline underline-offset-4 hover:text-blue', 'Instagram');
  moreLink.href = instagram;
  more.appendChild(external(moreLink));
  more.appendChild(document.createTextNode('.'));
  headText.appendChild(more);
  head.appendChild(headText);

  // One row with every clip, in file order (newest first). The format shows as a small tag on each card.
  var groups = clips.length ? [{ title: '', items: clips }] : [];

  if (groups.length > 1) {
    var jump = el('nav', '-mx-4 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden');
    jump.setAttribute('aria-label', 'Jump to a row');
    var jumpList = el('ul', 'flex w-max gap-1 rounded-full border border-line bg-white p-1');
    groups.forEach(function (g, i) {
      var li = el('li');
      var a = el('a', 'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-mute transition hover:bg-paper hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-blue', g.title);
      a.href = '#row-' + i;
      li.appendChild(a);
      jumpList.appendChild(li);
    });
    jump.appendChild(jumpList);
    head.appendChild(jump);
  }

  wrap.appendChild(head);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var chevron = { prev: '<path d="M15 18l-6-6 6-6"/>', next: '<path d="M9 6l6 6-6 6"/>' };

  function clipCard(clip) {
    var item = el('li', 'relative w-[44%] shrink-0 snap-start sm:w-[30.5%] md:w-[23%] lg:w-[18.4%]');
    var frame = el('div', 'relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-white shadow-card');
    N.mountPlayer(frame, clip, lane.theme);
    item.appendChild(frame);
    var meta = el('div', 'mt-3 px-1');
    if (clip.format) meta.appendChild(el('p', 'mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-blue', clip.format));
    meta.appendChild(el('h4', 'font-display text-base font-extrabold leading-snug tracking-tight sm:text-lg', clip.title));
    var open = el('a', 'mt-1.5 inline-block text-xs font-semibold text-mute underline-offset-4 hover:text-blue hover:underline', 'Open on ' + clip.source.name + ' ↗');
    open.href = clip.source.href;
    meta.appendChild(external(open));
    item.appendChild(meta);
    return item;
  }

  function buildRow(group, i) {
    var row = el('div', 'reveal mt-12 scroll-mt-24 first:mt-10');
    row.id = 'row-' + i;
    var trackId = 'track-' + i;

    var bar = el('div', 'flex items-end justify-between gap-4');
    var label = el('div');
    if (group.title) label.appendChild(el('h3', 'font-display text-2xl font-extrabold tracking-tight sm:text-3xl', group.title));
    bar.appendChild(label);

    var controls = el('div', 'hidden shrink-0 gap-2');
    function arrow(dir) {
      var b = el('button', 'flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition hover:border-ink disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue');
      b.type = 'button';
      b.setAttribute('aria-controls', trackId);
      b.setAttribute('aria-label', 'Scroll ' + (group.title || lane.short) + ' clips' + (dir < 0 ? ' back' : ' forward'));
      b.appendChild(N.svg(dir < 0 ? chevron.prev : chevron.next, 'h-5 w-5'));
      b.addEventListener('click', function () {
        track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
      return b;
    }
    var prev = arrow(-1);
    var next = arrow(1);
    controls.appendChild(prev);
    controls.appendChild(next);
    bar.appendChild(controls);
    row.appendChild(bar);

    var viewport = el('div', 'relative -mx-4 mt-5 sm:mx-0');
    var track = el('ul', 'flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-3 sm:scroll-pl-0 sm:gap-4 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden');
    track.id = trackId;
    track.setAttribute('role', 'list');
    track.setAttribute('aria-label', (group.title || lane.short) + ' clips');
    group.items.forEach(function (clip) { track.appendChild(clipCard(clip)); });
    viewport.appendChild(track);

    var fadeL = el('div', 'pointer-events-none absolute inset-y-0 left-0 hidden w-10 bg-gradient-to-r from-paper to-transparent opacity-0 transition-opacity sm:block');
    var fadeR = el('div', 'pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-paper to-transparent opacity-0 transition-opacity sm:w-16');
    viewport.appendChild(fadeL);
    viewport.appendChild(fadeR);
    row.appendChild(viewport);

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      var overflow = max > 4;
      controls.classList.toggle('sm:flex', overflow);
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max - 4;
      fadeL.classList.toggle('opacity-0', !overflow || prev.disabled);
      fadeR.classList.toggle('opacity-0', !overflow || next.disabled);
    }
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
    requestAnimationFrame(update);
    setTimeout(update, 400);
    return row;
  }

  if (clips.length) {
    var rows = el('div');
    groups.forEach(function (g, i) { rows.appendChild(buildRow(g, i)); });
    wrap.appendChild(rows);
  } else {
    var empty = el('div', 'reveal mt-10 flex flex-col items-center gap-5 rounded-[2rem] border-2 border-dashed border-line bg-white px-6 py-16 text-center');
    var emptyIcon = el('span', 'flex h-16 w-16 items-center justify-center rounded-2xl ' + t.block);
    emptyIcon.appendChild(N.svg(N.icons[key], 'h-8 w-8 ' + t.icon));
    empty.appendChild(emptyIcon);
    empty.appendChild(el('p', 'font-display text-2xl font-extrabold tracking-tight', 'Clips are landing here soon.'));
    empty.appendChild(el('p', 'max-w-sm text-mute', 'Until then, the latest ' + lane.short.toLowerCase() + ' drops are on Instagram.'));
    var emptyBtn = el('a', 'inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-blue', 'Watch on Instagram ↗');
    emptyBtn.href = instagram;
    empty.appendChild(external(emptyBtn));
    wrap.appendChild(empty);
  }

  section.appendChild(wrap);
  root.appendChild(section);

  // ---------- Other lanes ----------
  var more = el('section', 'pb-20 sm:pb-28');
  more.setAttribute('aria-labelledby', 'more-title');
  var moreWrap = el('div', 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8');
  var moreTitle = el('h2', 'reveal font-display text-3xl font-black tracking-tightest sm:text-4xl', 'Explore other lanes');
  moreTitle.id = 'more-title';
  moreWrap.appendChild(moreTitle);
  var moreGrid = el('ul', 'mt-6 grid gap-4 sm:grid-cols-3');
  moreGrid.setAttribute('role', 'list');
  var allClips = N.getVideos();
  Object.keys(N.content.lanes).filter(function (k) { return k !== key; }).forEach(function (k) {
    var other = N.content.lanes[k];
    var ot = N.themes[other.theme] || N.themes.blue;
    var count = allClips.filter(function (v) { return v.lane === k; }).length;
    var li = el('li', 'reveal');
    var a = el('a', 'group relative flex h-full items-center gap-4 overflow-hidden rounded-[2rem] border border-line bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-blue');
    a.href = k + '.html';
    var tile = el('span', 'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ' + ot.block);
    tile.appendChild(N.svg(N.icons[k], 'h-7 w-7 ' + ot.icon));
    a.appendChild(tile);
    var txt = el('span', 'flex-1');
    txt.appendChild(el('span', 'block font-display text-lg font-extrabold leading-tight tracking-tight', other.name));
    txt.appendChild(el('span', 'mt-0.5 block text-sm text-mute', count ? 'Handpicked clips' : 'New drops soon'));
    a.appendChild(txt);
    var arrow = el('span', 'text-xl text-mute transition group-hover:translate-x-1 group-hover:text-blue', '→');
    arrow.setAttribute('aria-hidden', 'true');
    a.appendChild(arrow);
    li.appendChild(a);
    moreGrid.appendChild(li);
  });
  moreWrap.appendChild(moreGrid);
  more.appendChild(moreWrap);
  root.appendChild(more);

  N.reveal(root);
})();
