int uv_run(uv_loop_t* loop, uv_run_mode mode) {
  int timeout;
  int r;
  int ran_pending;
  // 在uv_run之前要先提交任务到loop
  r = uv__loop_alive(loop);
  // 事件循环没有任务执行，即将退出，设置一下当前循环的时间
  if (!r)
    uv__update_time(loop);
  // 没有任务需要处理或者调用了uv_stop 
  while (r != 0 && loop->stop_flag == 0) {
    // 更新loop的time字段
    uv__update_time(loop);
    // 执行超时回调
    uv__run_timers(loop);
    // 执行pending回调，ran_pending代表pending队列是否为空，即没有节点可以执行
    ran_pending = uv__run_pending(loop);
    // 继续执行各种队列
    uv__run_idle(loop);
    uv__run_prepare(loop);

    timeout = 0;
    // 执行模式是UV_RUN_ONCE时，如果没有pending节点，才会阻塞式poll io，默认模式也是
    if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
      timeout = uv_backend_timeout(loop);
    // poll io timeout是epoll_wait的超时时间
    uv__io_poll(loop, timeout);
    uv__run_check(loop);
    uv__run_closing_handles(loop);
    // 还有一次执行超时回调的机会，因为poll io阶段可能是因为定时器超时返回的。
    if (mode == UV_RUN_ONCE) {
      uv__update_time(loop);
      uv__run_timers(loop);
    }

    r = uv__loop_alive(loop);
    // 只执行一次，退出循环,UV_RUN_NOWAIT表示在poll io阶段不会阻塞并且循环只执行一次
    if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
      break;
  }
  // 是因为调用了uv_stop退出的，重置flag
  if (loop->stop_flag != 0)
    loop->stop_flag = 0;
  // 返回是否还有活跃的任务（handle或request），业务代表可以再次执行uv_run
  return r;
} 