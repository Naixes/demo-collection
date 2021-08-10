var obj = {
  city: 'Beijing',
  12: 12,
  7: 7,
  0: 0,
  '-2': -2,
  age: 15,
  '-3.5': -3.5,
  7.7: 7.7,
  _: '___',
  online: true,
  3: 3,
  23: '23',
  44: 44,
};
for (var key in obj) {
  console.log('key: ', key);
}
