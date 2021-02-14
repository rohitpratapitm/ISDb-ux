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

}
module.exports = PROXY_CONFIG;