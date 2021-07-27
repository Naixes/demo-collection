// setTimeout(() => {
//     console.log('timer1')

//     Promise.resolve().then(function() {
//         console.log('promise1')
//     })
// }, 0)

// process.nextTick(() => {
//     console.log('nextTick')
//     process.nextTick(() => {
//         console.log('nextTick')
//         process.nextTick(() => {
//             console.log('nextTick')
//             process.nextTick(() => {
//                 console.log('nextTick')
//             })
//         })
//     })
// })

// ===================================================

// setImmediate(function () {
//     console.log(2); // 6 check
// });
// setTimeout(function () {
//     console.log(1); // 5 timers
// }, 0);
// process.nextTick(() => {
//     console.log(3); // 3 优先微任务
// });
// new Promise((resovle,reject)=>{
//     console.log(4); // 1 同步
//     resovle(4);
// }).then(function(){
//     console.log(5); // 4 微任务
// });
// console.log(6); // 2 同步

// // 463512

// ===================================================

// setImmediate(function () {
//     console.log(2); // 6 check
//     process.nextTick(() => {
//         console.log(7); // 7 优先微任务
//         process.nextTick(() => {
//             console.log(8); // 8 优先微任务
//             process.nextTick(() => {
//                 console.log(9); // 9 优先微任务
//             });
//         });
//     });
// });
// setTimeout(function () {
//     console.log(1); // 5 timers
// }, 0);
// process.nextTick(() => {
//     console.log(3); // 3 优先微任务
// });
// new Promise((resovle,reject)=>{
//     console.log(4); // 1 同步
//     resovle(4);
// }).then(function(){
//     console.log(5); // 4 微任务
//     setTimeout(function () {
//         console.log(10); // 11 timers
//     }, 0);
//     setImmediate(function () {
//         console.log(11); // 10 check
//     });
// });
// console.log(6); // 2 同步

// // 10不确定

// ===================================================

// setImmediate(function () {
//     console.log(2); // 8 check
// });
// setTimeout(function () {
//     console.log(1); // 7 timers
// }, 0);
// process.nextTick(() => {
//     console.log(3); // 3 优先微任务
// });
// new Promise((resovle,reject)=>{
//     console.log(4); // 1 同步
//     resovle(4);
// }).then(function(){
//     console.log(5); // 4 微任务
//     new Promise((resovle,reject)=>{
//         console.log(7); // 5 微任务嵌套同步
//         resovle(7);
//     }).then(function(){
//         console.log(8); // 6 微任务嵌套微任务
//     });
// });
// console.log(6); // 2 同步

// // 46357812

// ===================================================

// setTimeout(() => {
//     console.log('timeout');
// }, 0)
// setImmediate(() => {
//     console.log('immediate')
// })
// // 不确定

// ===================================================

'use strict';  
console.log(1);  // 1
setTimeout(() => {  // timers
    console.log(2)  //6
    new Promise((resolve) => { 
        console.log(6);  // 7
        resolve(7);
    }).then((num) => {  // 微任务
        console.log(num);  // 8
    })
    setTimeout(()=>{  // timers
        console.log(13);  // 12
    })
});
setTimeout(() => {  // timers
    console.log(3);  // 9
    new Promise((resolve) => {
        console.log(9);  // 10
        resolve(10);
    }).then((num) => {  // 微任务
        console.log(num);  // 11
    })
    setTimeout(()=>{  // timers
        console.log(8);  // 13
    })
})
new Promise((resolve) => {
    console.log(4);  // 2
    resolve(5)
}).then((num) => {  // 微任务
    console.log(num);  // 3
    new Promise((resolve)=>{ 
        console.log(11);  // 4
        resolve(12);
    }).then((num)=>{  // 微任务
        console.log(num);  // 5
    })
})

// 浏览器 1，4，5，11，12，2，6，7，3，9，10，8
// node 1，4，5，11，12，2，6，7，3，9，10，8