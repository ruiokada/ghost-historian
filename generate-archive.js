let api = require("./api.js");

let post_html_arr = [];
api.posts.browse({
  order: 'published_at ASC',
  filter: 'status:published'
}).then((posts) => {
  let curr_year = null;
  posts.forEach((post) => {
    let date = (new Date(post.published_at));
    let post_year = date.getFullYear();
    let post_month = date.getMonth();
    let post_day = date.getDate();
    if(curr_year != post_year) {
      curr_year = post_year;
      post_html_arr.push([`## ${curr_year}`]);
    }
    post_html_arr[post_html_arr.length - 1].push(`${post_year}-${post_month < 9 ? '0' : ''}${post_month + 1}-${post_day} &#187; [${post.title}](${post.url})`);
  });
  post_html_arr.reverse();
  return api.pages.read({ id: process.env.GHOST_ARCHIVE_PAGE_ID });
}).then((archive_page) => {
  mobiledoc = JSON.stringify({
    version: '0.3.1',
    markups: [],
    atoms: [],
    cards: [['markdown', { cardName: 'markdown', markdown: post_html_arr.map((arr) => arr.join("\n")).join("\n") }]],
    sections: [[10, 0]]
  });
  return api.pages.edit({
    id: process.env.GHOST_ARCHIVE_PAGE_ID,
    updated_at: archive_page.updated_at,
    mobiledoc: mobiledoc
  })
}).then(
  res => console.log("Success!")
).catch(
  err => console.log(err)
);
