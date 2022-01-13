// 柯里化
// 1 使用bind缓存参数
function curry(targetfn) {
    var numOfArgs = targetfn.length;
    // console.log('numOfArgs', numOfArgs);
    return function fn(...rest) {
        // console.log('...rest', ...rest);
        if (rest.length < numOfArgs) {
            // 缓存参数
            return fn.bind(null, ...rest);
        } else {
            return targetfn.apply(null, rest);
        }
    };
}

// 2 递归，使用arr[]缓存参数
const curry2 = (fn, arr = []) => {
    return (...args) => {
        // console.log('args', args);
        return (arg => {
            console.log('arg', arg);
            return (arg.length === fn.length ? fn(...arg) : curry2(fn, arg))
        })([ ...arr, ...args ]);
    }
}

// 加法函数
function add(a, b, c, d) {
    return a + b + c + d;
}
function add2(a, b) {
    return a + b;
}
// 将一个多参数函数转化为多个嵌套的单参数函数
console.log("柯里化1：", curry(add)(1, 2)(3)(4));
console.log("柯里化2：", curry2(add)(1, 2)(3)(4));
console.log("柯里化1=3：", curry(add2)(1, 2));
console.log("柯里化2=3：", curry2(add2)(1, 2));
// 柯里化：10