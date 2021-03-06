const express = require("express");
const app = express();
const httpProxy = require('http-proxy-middleware');

app.use(express.static(__dirname + '/dist/isdb-ux'));

// reverse proxy rules
const apiRule = httpProxy('/genius-api',
    {
        target: 'https://genius.p.rapidapi.com',
        secure: false,
        changeOrigin: true,
        "pathRewrite": {
            "^/genius-api": ""
          },
        logLevel: "debug"
    });
app.use('/genius-api', apiRule);

const lyricsRule = httpProxy('/genius-lyrics',
    {
        target: 'https://genius.com',
        secure: false,
        changeOrigin: true,
        "pathRewrite": {
            "^/genius-lyrics": ""
          },
        logLevel: "debug"
    });
app.use('/genius-lyrics', lyricsRule);

app.all('/*', function(req, res) {
    console.error('request received' + req);
    res.sendFile('index.html', {root: __dirname});
});

app.listen(process.env.PORT || 4200);
console.log('Server is up and running!');