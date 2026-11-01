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

  lane      football | diaspora | skits | vlogs
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
      intro: 'Matchday is a culture of its own. I hit the streets, the pubs and stadiums to get honest fan reactions, heated debates and the best one-liners you won\'t hear on the broadcast.',
      formats: ['Street interviews', 'Fan reactions', 'Pub debates']
    },
    diaspora: {
      number: '02',
      name: 'Diaspora Culture',
      short: 'Diaspora',
      tag: 'Culture',
      theme: 'gold',
      blurb: 'Heritage, home, and the people carrying it forward wherever they live now.',
      intro: 'Culture does not stay in one place, and neither do I. Street trivia, interviews and events with people from every corner of the diaspora, wherever the action is, in any season.',
      formats: ['Street trivia', 'Street interviews', 'Cultural events']
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
      intro: 'A narrated peep into my experiences.',
      formats: ['Day in the life', 'Behind the scenes', 'Events & outings']
    }
  },

  // Replace PASTE_INSTAGRAM_LINK_HERE with the real reel link and edit the title.
  // A block with the placeholder link is skipped, so unfinished ones never show on the site.
  videos: [
    // ---------- FOOTBALL ----------
     {
      lane: 'football',
      url: 'https://www.instagram.com/reel/DbHVcI8RGI-/?utm_source=ig_web_copy_link&srtk=NTc4MTIwNjQ2YQ==',
      title: 'Spanish Fans React to World Cup 2026 Win',
      format: 'Street interviews',
      featured: false,
      cover: 'images/clips/spain-fans.jpg'
    },
     {
      lane: 'football',
      url: 'https://www.instagram.com/reel/DdhTm-PxioJ/?utm_source=ig_web_copy_link&rpxt=NTc4MTIwNjQ2YQ==',
      title: 'Arsenal Fans React After First Premier League Lost',
      format: 'Street interviews',
      featured: false,
      cover: 'images/clips/arsenal-fans.jpg'
    },
    {
      lane: 'football',
      url: 'https://www.instagram.com/reel/DZWA40jxv4p/?utm_source=ig_web_copy_link&cplk=NTc4MTIwNjQ2YQ==',
      title: 'Asking Norwegian Fans who is better in their prime: Rooney vs Haaland?',
      format: 'Street interviews',
      featured: false,
      cover: 'images/clips/norwegian-fans.jpg'
    },
    {
      lane: 'football',
      url: 'https://www.instagram.com/reel/DZbAN12RMm_/?utm_source=ig_web_copy_link&mdxt=NTc4MTIwNjQ2YQ==', // <-- PASTE THE REEL LINK BETWEEN THE QUOTES, e.g. 'https://www.instagram.com/reel/AbC123xyz/'
      title: 'Pre-Match Interview with Moroccan Fans',
      format: 'Street interviews',
      featured: true,
      cover: 'images/clips/moroccan-fans.jpg'
    },
     {
      lane: 'football',
      url: 'https://www.instagram.com/reel/DdScpZNRbfj/?utm_source=ig_web_copy_link&exln=NTc4MTIwNjQ2YQ==',
      title: 'Premier League Fans Give Hot Takes',
      format: 'Street interviews',
      featured: true,
      cover: 'images/clips/premier-league-takes.jpg'
    },
    // ---------- DIASPORA  ----------
    {
      lane: 'diaspora',
      url: 'https://www.instagram.com/reel/DemblaXxYPg/?utm_source=ig_web_copy_link&exln=NTc4MTIwNjQ2YQ==', 
      title: 'Guyanese Trivia Questions',
      format: 'Street trivia',
      featured: true,
      cover: 'images/clips/guyanese-trivia.jpg'
    },
    {
      lane: 'diaspora',
      url: 'https://www.instagram.com/reel/DeF5Fc8RfzB/?utm_source=ig_web_copy_link&obrf=NTc4MTIwNjQ2YQ==',
      title: 'Finish the Afrobeat Lyrics',
      format: 'Street trivia',
      featured: false,
      cover: 'images/clips/afrobeat-lyrics.jpg'
    },
     {
      lane: 'diaspora',
      url: 'https://www.instagram.com/reel/DeUUeLoRtb1/?utm_source=ig_web_copy_link&exln=NTc4MTIwNjQ2YQ==', 
      title: 'Finish the Nigerian Pidgin',
      format: 'Street trivia',
      featured: false,
      cover: 'images/clips/nigerian-pidgin.jpg'
    },
    {
      lane: 'diaspora',
      url: 'https://www.instagram.com/reel/De4rh_IR2WD/?utm_source=ig_web_copy_link&dlrf=NTc4MTIwNjQ2YQ==', 
      title: 'Favorite Part of Howard Homecoming',
      format: 'Street interviews',
      featured: false,
      cover: 'images/clips/howard-homecoming.jpg'
    },
    // ---------- SKITS ----------
    {
      lane: 'skits',
      url: 'https://www.instagram.com/reel/DeyGC-DRN1a/?utm_source=ig_web_copy_link&srtk=NTc4MTIwNjQ2YQ==',
      title: 'POV: Enjoying life then remembering you support Man Utd',
      format: 'Living room POVs',
      featured: false,
      cover: 'images/clips/man-utd-pov.jpg'
    },
    {
      lane: 'skits',
      url: 'https://www.instagram.com/reel/DeA1AHJxjEE/?utm_source=ig_web_copy_link&mdxt=NTc4MTIwNjQ2YQ==',
      title: 'POV: Caribbean People Lying When They Are Late',
      format: 'Organic humor',
      featured: false,
      cover: 'images/clips/late-skit.jpg'
    },
    {
      lane: 'skits',
      url: 'https://www.instagram.com/reel/DbZaSEdROjq/?utm_source=ig_web_copy_link&psln=NTc4MTIwNjQ2YQ==',
      title: 'POV: Countdown to the next World Cup',
      format: 'Organic humor',
      featured: false,
      cover: 'images/clips/world-cup-countdown.jpg'
    },
    {
      lane: 'skits',
      url: 'https://www.instagram.com/reel/Db12rEAxFiE/?utm_source=ig_web_copy_link&vrfl=NTc4MTIwNjQ2YQ==',
      title: 'POV: Bajan At Jamaican Parade',
      format: 'Organic humor',
      featured: false,
      cover: 'images/clips/jamaican-parade-pov.jpg'
    },
    // ---------- VLOGS ----------
    {
      lane: 'vlogs',
      url: 'https://www.instagram.com/reel/Dcj9c-vxrHw/?utm_source=ig_web_copy_link&xtok=NTc4MTIwNjQ2YQ==',
      title: 'Premier League USA Man Utd Vlog',
      format: 'Day in the life',
      featured: false,
      cover: 'images/clips/man-utd-vlog.jpg'
    },
    {
      lane: 'vlogs',
      url: 'https://www.instagram.com/reel/DdFpNJTxD1A/?utm_source=ig_web_copy_link&srtk=NTc4MTIwNjQ2YQ==', // <-- PASTE THE REEL LINK BETWEEN THE QUOTES, e.g. 'https://www.instagram.com/reel/AbC123xyz/'
      title: 'West Indian Day Parade in NYC',
      format: 'Events & outings',
      featured: false,
      cover: 'images/clips/west-indian-day-parade.jpg'
    },
    {
      lane: 'vlogs',
      url: 'https://www.instagram.com/reel/DdNM6dZxySM/?utm_source=ig_web_copy_link&srtk=NTc4MTIwNjQ2YQ==',
      title: 'SocaFest NYC',
      format: 'Events & outings',
      featured: false,
      cover: 'images/clips/socafest-nyc.jpg'
    }
  ]
};
