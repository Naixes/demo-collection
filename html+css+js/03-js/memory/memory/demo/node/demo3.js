const http = require('http');
const memeye = require('memeye');
memeye();
let s = '';
for (let i = 0; i < 1024 * 10; i++) {
  s += 'a';
}

const str = s;
const bufStr = Buffer.from(s);
const server = http.createServer((req, res) => {
  if (req.url == '/buffer') {
    res.end(bufStr);
  } else if (req.url == '/string') {
    res.end(str);
  }
});
server.listen(3000);
