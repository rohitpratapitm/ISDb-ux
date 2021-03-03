const PROXY_CONFIG = {
  "/genius-api": {
    "target": "https://genius.p.rapidapi.com",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/genius-api": ""
    },
    "logLevel": "debug"
  },
  "/genius-lyrics": {
    "target": "https://genius.com",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/genius-lyrics": ""
    },
    "logLevel": "debug"
  },

}
module.exports = PROXY_CONFIG;