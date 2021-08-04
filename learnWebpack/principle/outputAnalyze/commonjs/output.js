// 打包后：一个立即执行函数，传入对象，key是文件路径，value是文件内容
// 简化后：
// (function (modules) {})({
//   path1: function1,
//   path2: fucntion2,
// });

// 1. 定义缓存模块对象
// 2. 实现模块加载函数__webpack_require__
//  	2.1 判断缓存
//  	2.2 新建一个module放入缓存
//  	2.3 执行路径对应的模块函数，参数module，module.exports，__webpack_require__
//  	2.4 模块标识为已加载
//  	2.5 执行完成后返回exports对象
// 3. ...
// 4. 使用__webpack_require__加载入口函数
/*** 一个立即执行函数 ***/ 
(function (modules) {
    // webpackBootstrap
    // The module cache
    //   模块缓存对象
    var installedModules = {};
    // The require function
    //   webpack 实现的require()函数
    function __webpack_require__(moduleId) {
      // Check if module is in cache
      // 如果模块已经加载过，直接返回缓存
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      // Create a new module (and put it into the cache)
      // 创建一个新模块，并放入缓存
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {},
      });
      // Execute the module function
      // 执行模块函数
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      // Flag the module as loaded
      // 将模块标识为已加载
      module.l = true;
      // Return the exports of the module
      return module.exports;
    }
    // expose the modules object (__webpack_modules__)
    // 将所有的模块挂载到 require() 函数上
    __webpack_require__.m = modules;
  
    // expose the module cache
    // 将缓存对象挂载到 require() 函数上
    __webpack_require__.c = installedModules;
    // define getter function for harmony exports
    __webpack_require__.d = function (exports, name, getter) {
      if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter,
        });
      }
    };
    // define __esModule on exports
    __webpack_require__.r = function (exports) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
    // create a fake namespace object
    // mode & 1: value is a module id, require it
    // mode & 2: merge all properties of value into the ns
    // mode & 4: return value when already ns object
    // mode & 8|1: behave like require
    __webpack_require__.t = function (value, mode) {
      if (mode & 1) value = __webpack_require__(value);
      if (mode & 8) return value;
      if (mode & 4 && typeof value === "object" && value && value.__esModule)
        return value;
      var ns = Object.create(null);
      __webpack_require__.r(ns);
      Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value,
      });
      if (mode & 2 && typeof value != "string")
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function (key) {
              return value[key];
            }.bind(null, key)
          );
      return ns;
    };
    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function (module) {
      // 判断是否esmodule
      var getter =
        module && module.__esModule
          ? function getDefault() {
              return module["default"];
            }
          : function getModuleExports() {
              return module;
            };
      __webpack_require__.d(getter, "a", getter);
      return getter;
    };
    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    // __webpack_public_path__
    __webpack_require__.p = "";
    // Load entry module and return exports
    // 加载入口模块，并返回模块对象
    return __webpack_require__((__webpack_require__.s = "./src/index.js"));
  })({
    "./src/index.js": function (module, exports, __webpack_require__) {
      eval(
        // 格式化：对比源代码，require改为了__webpack_require__
        // const test2 = __webpack_require__("./src/test2.js");
              // function test() {}
              // test();
              // test2();
              //# sourceURL=webpack:///./src/index.js?
        'const test2 = __webpack_require__(/*! ./test */ "./src/test.js");\nfunction test() {}\n\ntest();\ntest2();\n\n//# sourceURL=webpack:///./src/index.js?'
      );
    },
  
    "./src/test.js": function (module, exports) {
      eval(
        "function test2() {}\n\nmodule.exports = test2;\n\n//# sourceURL=webpack:///./src/test.js?"
      );
    },
  });