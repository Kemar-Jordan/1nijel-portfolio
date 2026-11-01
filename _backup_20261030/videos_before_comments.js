/*
  ============================================================
  1NIJEL CONTENT FILE: the only file you need to edit to add clips.
  ============================================================

  To add a clip, copy this block into the `videos` list below:

    {
      lane: 'football',
      url: 'https://www.instagram.com/reel/XXXXXXXXXXX/',
      title: 'Arsenal fans after the derby',
      format: 'Fan reactions',
      featured: false,
      cover: ''
    },

  lane      football | caribbean | skits | vlogs
  url       The Instagram link (Share > Copy link). YouTube Shorts links work too.
  title     Short title shown under the clip.
  format    Optional. One of that lane's formats; each format gets a filter button on the lane page.
  featured  Optional. true puts the clip in "Flagship drops" on the homepage (first 2 are used).
  cover     Optional. A thumbnail in your images folder, e.g. 'images/clips/derby.jpg' (9:16 works best).

  Put newest clips at the top of the list. They show in this order.
*/

window.NIJEL_CONTENT = {
  instagram: 'https://www.instagram.com/1nijel/',
  youtube: 'https://www.youtube.com/@1nijel-u5c',

  lanes: {
    football: {
      number: '01',
      name: 'Football & Matchday Culture',
      short: 'Football',
      tag: 'Sports',
      theme: 'blue',
      blurb: 'The energy before kick-off and the hot takes after full-time.',
      intro: 'Matchday is a culture of its own. I hit the streets, the pubs and the stadium approach to get honest fan reactions, heated debates and the best one-liners you won\'t hear on the broadcast.',
      formats: ['Street interviews', 'Fan reactions', 'Pub debates']
    },
    caribbean: {
      number: '02',
      name: 'Caribbean & Diaspora Vibes',
      short: 'Caribbean',
      tag: 'Culture',
      theme: 'gold',
      blurb: 'Heritage, home, and the people carrying it forward wherever they live now.',
      intro: 'Celebrating Caribbean heritage and the diaspora that keeps it alive: cultural events, street trivia that tests how well you know your roots, and the moments that make us proud.',
      formats: ['Cultural events', 'Street trivia', 'Carnival coverage']
    },
    skits: {
      number: '03',
      name: 'Skits & POVs',
      short: 'Skits',
      tag: 'Comedy',
      theme: 'ink',
      blurb: 'Everyday moments, pushed just far enough to feel like the family group chat.',
      intro: 'Living room POVs, commentary and organic humor. The situations everybody has lived through, played out the way we all wish we could tell them.',
      formats: ['Living room POVs', 'Commentary', 'Organic humor']
    },
    vlogs: {
      number: '04',
      name: 'Vlogs',
      short: 'Vlogs',
      tag: 'Lifestyle',
      theme: 'sky',
      blurb: 'Off the clock and behind the camera: days out, events, and everything between the clips.',
      intro: 'The life around the content. Days out, events and behind-the-scenes looks at how the clips actually get made, with the engineer and the enjoyment minister both on camera.',
      formats: ['Day in the life', 'Behind the scenes', 'Events & outings']
    }
  },

  // Replace PASTE_INSTAGRAM_LINK_HERE with the real reel link and edit the title.
  // A block with the placeholder link is skipped, so unfinished ones never show on the site.
  videos: [
    // ---------- FOOTBALL ----------
    {
      lane: 'football',
      url: 'PASTE_INSTAGRAM_LINK_HERE',
      title: 'Football clip title 1',
      format: 'Street interviews',
      featured: true,
      cover: ''
    },
    {
      lane: 'football',
      url: 'PASTE_INSTAGRAM_LINK_HERE',
      title: 'Football clip title 2',
      format: 'Fan reactions',
      featured: false,
      cover: ''
    },
    // ---------- CARIBBEAN ----------
    {
      lane: 'caribbean',
      url: 'PASTE_INSTAGRAM_LINK_HERE',
      title: 'Caribbean clip title 1',
      format: 'Street trivia',
      featured: true,
      cover: ''
    },
    {
      lane: 'caribbean',
      url: 'PASTE_INSTAGRAM_LINK_HERE',
      title: 'Caribbean clip title 2',
      format: 'Cultural events',
      featured: false,
      cover: ''
    },
    // ---------- SKITS ----------
    {
      lane: 'skits',
      url: 'PASTE_INSTAGRAM_LINK_HERE',
      title: 'Skit title 1',
      format: 'Living room POVs',
      featured: false,
      cover: ''
    },
    {
      lane: 'skits',
      url: 'PASTE_INSTAGRAM_LINK_HERE',
      title: 'Skit title 2',
      format: 'Organic humor',
      featured: false,
      cover: ''
    },
    // ---------- VLOGS ----------
    {
      lane: 'vlogs',
      url: 'PASTE_INSTAGRAM_LINK_HERE',
      title: 'Vlog title 1',
      format: 'Day in the life',
      featured: false,
      cover: ''
    },
    {
      lane: 'vlogs',
      url: 'PASTE_INSTAGRAM_LINK_HERE',
      title: 'Vlog title 2',
      format: 'Events & outings',
      featured: false,
      cover: ''
    }
  ]
};
