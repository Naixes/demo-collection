var yideng = {
  15: 'xxx',
  // 40: '我是随机数',
  // test1: '京程一灯2',
  // ayideng: '京程一灯',
};
for (let i = 0; i < 16; i++) {
  yideng['p' + i] = 1;
}
// yideng['xxxx'] = Math.random();
console.log('🐻最初的样子', %DebugPrint(yideng));

// delete yideng.test1;
// console.log('📚反向顺序删除', %DebugPrint(yideng));
