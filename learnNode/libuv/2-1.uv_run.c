int uv_run(uv_loop_t* loop, uv_run_mode mode) {
  int timeout;
  int r;
  int ran_pending;

//首先检查我们的loop还是否活着
//活着的意思代表loop中是否有异步任务
//如果没有直接就结束
  r = uv__loop_alive(loop);
  if (!r)
    uv__update_time(loop);

//传说中的事件循环，你没看错了啊！就是一个大while
  while (r != 0 && loop->stop_flag == 0) {
      //更新事件阶段
    uv__update_time(loop);

    //处理timer回调
    uv__run_timers(loop);

    //处理异步任务回调 
    ran_pending = uv__run_pending(loop);

    //没什么用的阶段
    uv__run_idle(loop);
    uv__run_prepare(loop);

    //这里值得注意了
    //从这里到后面的uv__io_poll都是非常的不好懂的
    //先记住timeout是一个时间
    //uv_backend_timeout计算完毕后，传递给uv__io_poll
    //如果timeout = 0,则uv__io_poll会直接跳过
    timeout = 0;
    if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
      timeout = uv_backend_timeout(loop);

    uv__io_poll(loop, timeout);

    //就是跑setImmediate
    uv__run_check(loop);

    //关闭文件描述符等操作
    uv__run_closing_handles(loop);

    //再次检查是否活着
    //如果没有任何任务了，就推出
    r = uv__loop_alive(loop);
    if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
      break;
  }
  return r;
}


// 没错，事件循环就是一个大while而已！神秘的面纱就此揭开。