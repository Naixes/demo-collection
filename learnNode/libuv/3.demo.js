const http = require('http'); //同步任务
const port = 3000; //同步任务
http.createServer().listen(port, () => console.log('我是第一轮事件循环')); //同步任务中的异步请求
console.log('准备进入循环');

// 1.update_time
// 在事件循环的开头，这一步的作用实际上是为了获取一下系统时间，以保证之后的timer有个计时的标准。这个动作会在每次事件循环的时候都发生，确保了之后timer触发的准确性。（其实也不太准确....)

// 2. timers
// 事件循环跑到这个阶段的时候，要检查是否有到期的timer,其实也就是setTimeout和setInterval这种类型的timer，到期了，就会执行他们的回调。

// 3. I/O callbacks
// 处理异步事件的回调，比如网络I/O，比如文件读取I/O。当这些I/O动作都结束的时候，
//在这个阶段会触发它们的回调。我特别指出了结束这个限定语。

// 4. idle, prepare
// 这个阶段内部做一些动作，与理解事件循环没啥关系

// 5. I/O poll阶段
// 这个阶段相当有意思，也是事件循环设计的一个有趣的点。
//这个阶段是选择运行的。选择运行的意思就是不一定会运行。
//在这里，我先卖一个关子，后问详细深入讨论。

// 6. check
// 执行setImmediate操作

// 7. close callbacks
// 关闭I/O的动作，比如文件描述符的关闭，链接断开，等等等

update_time;
// timers：执行setTimeout() 和 setInterval()中到期的callback。
// I/O callbacks：上一轮循环中有少数的I/Ocallback会被延迟到这一轮的这一阶段执行
// idle, prepare：队列的移动，仅内部使用
// poll：最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段
// check：执行setImmediate的callback
// close callbacks：执行close事件的callback，例如socket.on(“close”,func)
