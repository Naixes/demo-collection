const { SyncHook } = require('tapable');
const Compilation = require('./Compilation');
const fs = require('fs');
const { join } = require('path');

class Compiler {
  constructor(options) {
    // console.log('webpack配置文件 options: ', options);
    this.options = options;
    this.entry = options.entry;
    this.output = options.output;
    //最后生成代码的部分
    this.modules = [];
    this.hooks = {
      run: new SyncHook(['compilation']),
    };
  }
  run(callback) {
    console.log('构建开始');
    const onCompiled = (err, compilation) => {
      //生成静态文件
      this.emitAssets(compilation, (err) => {});
    };
    this.compile(onCompiled);
  }
  compile(callback) {
    const compilation = this.newCompilation();
    //触发初始化钩子开始运作
    this.hooks.run.call(compilation);
    //通过通过compilation对代码进行封装
    compilation.seal(callback);
  }
  newCompilation() {
    const compilation = this.createCompilation();
    return compilation;
  }
  createCompilation() {
    return new Compilation(this);
  }
  emitAssets(compilation) {
    console.log('🌺[ 生成dist main.js文件 ]🌺');
    let _modules = '';
    this.modules.map((_module) => {
      _modules += `"${_module.filename}":(function (module, exports, require) { 
          //js代码段
          ${_module.transformCode}
      }),`;
    });
    const outputPath = join(this.output.path, this.output.filename);
    const template = `(function (modules) {
      // 模块的缓存
      var installedModules = {};
      function __webpack_require__(moduleId) {
          // 对缓存进行检查
          if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
          }
          // 创建一个空模块 并将moduleId模块放入缓存
          // installedModules["./src/index.js"] = module
          // module.exports = {}
          var module = installedModules[moduleId] = {
              exports: {}
          };
          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          // 如果代码内部含有exports 一定要记得return
          return module.exports;
      }
      return __webpack_require__("${this.entry}");
    })({
    ${_modules}
    })`;
    // console.log('🌺🌺', _modules);
    fs.writeFileSync(outputPath, template, 'utf-8');
  }
}
module.exports = Compiler;
