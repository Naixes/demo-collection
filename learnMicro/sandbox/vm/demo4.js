// 将非受信代码，通过 vm2 这个模块隔离在一个独立的进程中执行。然后，执行超时时，直接将隔离的进程干掉
// 再建一个进程池，通过「进程池」即能降低「进程来回创建和销毁的开销」，也能确保不过度抢占宿主资源，
// 同时，在异步操作超时，还能将工程进程直接杀掉，同时，master 将发现一个工程进程挂掉，会立即创建替补进程。
