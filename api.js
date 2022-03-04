const GhostAdminAPI = require('@tryghost/admin-api');

const api = new GhostAdminAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_KEY,
  version: "v3"
});

module.exports = api;