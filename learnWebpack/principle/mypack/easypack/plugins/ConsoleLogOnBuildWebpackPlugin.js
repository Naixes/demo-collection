const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    console.log('---默认插件开始注册---');
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('The webpack build process is starting!!!');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
