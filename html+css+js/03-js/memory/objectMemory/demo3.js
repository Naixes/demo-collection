var yideng = {
  15: 'xxx',
  test1: '京程一灯2',
  test3: '33333',
};
// // yideng['test2'] = 'xxxx';
// for (let i = 0; i < 19; i++) {
//   yideng['p' + i] = 1;
// }

// var yideng = Object.create(null);
delete yideng.test3;
console.log('🐻最初的样子', %DebugPrint(yideng));
