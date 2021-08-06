// setImmediate和setTimeout()是相似的，但根据它们被调用的时间以不同的方式表现。

// setImmediate()设计用于在当前poll阶段完成后check阶段执行脚本 。
// setTimeout() 安排在经过最小（ms）后运行的脚本，在timers阶段执行。

const fs = require('fs');

// fs.readFile(__filename, () => {
//   console.log(1);
// });

// fs.readFile(__filename, () => {
setTimeout(() => {
  console.log('timeout');
}, 0);
setImmediate(() => {
  console.log('immediate');
});
// });
// fs.readFile(__filename, () => {
//   console.log(3);
// });
// 执行定时器的顺序将根据调用它们的上下文而有所不同。
//如果从主模块中调用两者，那么时间将受到进程性能的限制。

// 其结果可以确定一定是immediate => timeout。
// 主要原因是在I/O阶段读取文件后，事件循环会先进入poll阶段，
// 发现有setImmediate需要执行，会立即进入check阶段执行setImmediate的回调。
// 然后再进入timers阶段，执行setTimeout，打印timeout。
//    ┌───────────────────────────┐
// ┌─>│           timers          │
// │  └─────────────┬─────────────┘
// │  ┌─────────────┴─────────────┐
// │  │     pending callbacks     │
// │  └─────────────┬─────────────┘
// │  ┌─────────────┴─────────────┐
// │  │       idle, prepare       │
// │  └─────────────┬─────────────┘      ┌───────────────┐
// │  ┌─────────────┴─────────────┐      │   incoming:   │
// │  │           poll            │<─────┤  connections, │
// │  └─────────────┬─────────────┘      │   data, etc.  │
// │  ┌─────────────┴─────────────┐      └───────────────┘
// │  │           check           │
// │  └─────────────┬─────────────┘
// │  ┌─────────────┴─────────────┐
// └──┤      close callbacks      │
//    └───────────────────────────┘
