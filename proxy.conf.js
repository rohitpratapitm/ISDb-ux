const PROXY_CONFIG = {
  "/api": {
    "target": "https://api.happi.dev",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
module.exports = PROXY_CONFIG;