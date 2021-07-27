// (function () {
//     var root = typeof self == 'object' && self.self === self && self ||
//         typeof global == 'object' && global.global === global && global ||
//         this ||
//         {};
var ArrayProto = Array.prototype;
var push = ArrayProto.push;
var _ = function (obj) {
    // console.log((this instanceof _))
    if (!(this instanceof _)) return new _(obj);
    //保留了一个全局执行对象 参数进行了缓存
    this._wrapped = obj;
};
_.VERSION = '1.9.1';
_.map = function (obj, iteratee) {
    console.log("🍎", obj);
    console.log("🍊", iteratee);
};
_.isFunction = function (obj) {
    return typeof obj == 'function' || false;
};
_.functions = _.methods = function (obj) {
    var names = [];
    for (var key in obj) {
        if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
};
_.isString = (node) => typeof node === "string";
_.each = function (arrs, func) {
    // console.log(func);
    for (let item of arrs) {
        func.call(null, item);
    }
}
_.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
        var func = obj[name];
        _.prototype[name] = function () {
            var args = [this._wrapped];
            push.apply(args, arguments);
            //调用链上的方法 防止this被修改
            return func.apply(_, args);
        };
    });
    return _;
};
_.mixin(_);
export default _;
export {
    _
}
//     if (typeof exports != 'undefined' && !exports.nodeType) {
//         if (typeof module != 'undefined' && !module.nodeType && module.exports) {
//             exports = module.exports = _;
//         }
//         exports._ = _;
//     } else {
//         root._ = _;
//     }
// })()