const Compiler = require('./Compiler.js');
const webpack = function (options) {
  //webpack构建的核心
  const compiler = new Compiler(options);
  if (Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      console.log('options.plugins: ', plugin);
      plugin.apply(compiler);
    }
  }
  return compiler;
};
module.exports = webpack;
