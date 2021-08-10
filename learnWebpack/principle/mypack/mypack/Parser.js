const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAstSync } = require('@babel/core');
const fs = require('fs');

class Parser {
  static ast(path) {
    //默认的entry
    const content = fs.readFileSync(path, 'utf8');
    return babylon.parse(content, {
      sourceType: 'module',
    });
  }
  static getDependency(ast) {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  }

  static transform(ast) {
    const { code } = transformFromAstSync(ast, null, {
      presets: ['@babel/preset-env'],
    });
    return code;
  }
}
module.exports = Parser;
