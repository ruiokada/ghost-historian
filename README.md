# Ghost Historian

This is a build job that generates a post archive page and a post update log page for Ghostblog.


## Environment Variables

Make sure the following environment variables are set on the machine running the build job:

* `GHOST_KEY` - API key for Ghost site
* `GHOST_URL` - URL of Ghost site
* `GHOST_ARCHIVE_PAGE_ID` - Page ID of page to be used as the archive page.
* `GHOST_LOG_PAGE_ID` - Page ID of page to be used as the log page.