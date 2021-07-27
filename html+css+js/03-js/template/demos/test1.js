const parse = require('../src/tpl');
const template = "<div>${content|concatFilter:'01'}</div>";
const data = {
  content: 'sin',
};

const filter = {
  concatFilter: function (str1, str2) {
    // console.log('具体的参数', str1, str2);
    return str1 + str2;
  },
};

const html = parse(template, data, filter);
console.log('🍊得到的html', html);

// 生成的函数📚
// function anonymous(DATA, FILTER) {
//   try {
//     var OUT = [];
//     var content = DATA['content'];
//     var FILTERS = {};
//     FILTERS['escape'] = FILTER['escape'];
//     FILTERS['concatFilter'] = FILTER['concatFilter'];
//     OUT.push('<div>');
//     OUT.push(FILTERS['concatFilter'](content, '01').toString());
//     OUT.push('</div>');
//     return OUT.join('');
//   } catch (e) {
//     throw e;
//   }
// }
