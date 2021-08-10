const Parser = require('./Parser');
const { join } = require('path');

class Compilation {
  constructor(compiler) {
    const { options, modules } = compiler;
    //webpack的配置文件
    this.options = options;
    this.modules = modules;
  }
  seal(callback) {
    console.log('callback---> ', callback);
    const entryModule = this.buildModule(this.options.entry, true);
    // 1.异步的模块独立的chunk
    // 2.同步的模块独立的chunk
    // 3.不抽出独立的chunk? spa main.js(12.5m) splitchunks
    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency, false));
      });
    });
    console.log('[  封装对应的entry和chunk]');

    callback(null, this);
  }
  buildModule(filename, isEntry) {
    let absolutePath = '';
    let ast = '';
    if (!isEntry) {
      absolutePath = join(process.cwd(), './src/', filename);
      ast = Parser.ast(absolutePath);
    } else {
      // console.log('Parser.ast: ', Parser.ast);
      ast = Parser.ast(filename);
    }
    const dependencies = Parser.getDependency(ast);
    const transformCode = Parser.transform(ast);
    // console.log('🐻transformCode---> ', transformCode);
    return {
      filename,
      dependencies,
      transformCode,
    };
  }
}
module.exports = Compilation;
