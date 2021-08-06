setTimeout(function () {
    console.log(1);
}, 0);
setImmediate(function () {
    console.log(2);
});
process.nextTick(() => {
    console.log(3);
});
new Promise((resovle,reject)=>{
    console.log(4);
    resovle(4);
}).then(function(){
    console.log(5);
});
console.log(6);

// 4
// 6
// 3
// 5
// 1
// 2

// macrotask microtask