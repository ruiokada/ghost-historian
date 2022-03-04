let api = require("./api.js");

let markdown = '';

let log_html_arr;
api.posts.browse({
  order: 'updated_at DESC',
  filter: 'status:published',
  limit: '15'
}).then((posts) => {
  log_html_arr = posts.map((post) => {
    let date = (new Date(post.updated_at));
    let post_year = date.getFullYear();
    let post_month = date.getMonth();
    let post_day = date.getDate();
    return `<span class='log--updated-at' data-updated_at='${date}'>${post_year}-${post_month < 9 ? "0" : ""}${post_month + 1}-${post_day}</span> &#187; [${post.title}](${post.url})`;
  });
  return api.pages.read({ id: process.env.GHOST_LOG_PAGE_ID });
}).then((log_page) => {
  markdown += "The 15 most recently updated posts.\n\n";
  markdown += log_html_arr.join('\n');
  markdown += `<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js'></script>`;
  markdown += `<script type='text/javascript'>`;
  markdown += `Array.prototype.forEach.call(document.querySelectorAll('.log--updated-at'), function(el){`;
  markdown += `el.innerText = moment(new Date(el.getAttribute('data-updated_at'))).fromNow();`
  markdown += `});`;
  markdown += `</script>`;
  mobiledoc = JSON.stringify({
    version: '0.3.1',
    markups: [],
    atoms: [],
    cards: [['markdown', { cardName: 'markdown', markdown: markdown }]],
    sections: [[10, 0]]
  });
  return api.pages.edit({
    id: process.env.GHOST_LOG_PAGE_ID,
    updated_at: log_page.updated_at,
    mobiledoc: mobiledoc
  })
}).then(
  res => console.log("Success!")
).catch(
  err => console.log(err)
);