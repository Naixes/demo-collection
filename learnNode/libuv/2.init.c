#include <stdio.h>
#include <stdlib.h>
#include <uv.h>

//iocp epoll kqueue

int main() {
    printf("Hello world.\n");
    // v_loop_t * loop = uv_default_loop();:
    //初始化loop，使用默认loop来跑。node中也是使用默认的loop。
    uv_loop_t * loop = uv_default_loop();
    // uv_run(loop, UV_RUN_DEFAULT);:跑loop。
    uv_run(loop, UV_RUN_DEFAULT);
    // uv_loop_close(loop);:关闭loop和释放loop分配的内存
    uv_loop_close(loop);
    return 0;
}
//output:Hello world.

