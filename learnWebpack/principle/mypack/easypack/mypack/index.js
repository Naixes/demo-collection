//主入口文件
const webpack = require('./webpack');
const options = require('../ydpack.config');

const compiler = webpack(options);
compiler.run((err) => {
  if (err) {
    console.log('编译出错', err);
  }
  // compiler.close();
});
