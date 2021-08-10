//delete执行时间上巨大的问题
const startTime = +new Date();
for (let i = 0; i < 1000000; i++) {
  const a = {
    a: '1',
    b: '2',
    c: '3',
  };
  a.b = undefined;
  // delete a.b;
  // delete a.c;
}
const endTime = +new Date();
console.log(endTime - startTime);
