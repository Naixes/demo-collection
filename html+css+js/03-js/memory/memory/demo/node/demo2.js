const http = require('http');
const memeye = require('memeye');
memeye();
let leakArray = [];
const server = http.createServer((req, res) => {
  if (req.url == '/') {
    // const wm = new WeakMap();
    leakArray.push(Math.random());
    // wm.set(leakArray, leakArray);
    // console.log(wm.get(leakArray));
    console.log(leakArray);
    // leakArray = null;
    res.end('hello world');
  }
});
server.listen(4000);
