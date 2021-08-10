const { resolve } = require('path');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackBaseConfig = {
  entry: {
    entry1: './src/entry/entry1.js',
    entry2: './src/entry/entry2.js',
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    //  规则
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 4,
      //   // enforceSizeThreshold: 50000,
      minChunks: 2,
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          enforce: true,
          // name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            console.log('参与');
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `laoyuan-${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          priority: -10,
          // reuseExistingChunk: true,
        },
        commons: {
          chunks: 'all',
          name: 'commons',
          priority: -20,
          //忽略 minSize，minChunks，maxAsyncRequests和maxInitialRequests外面选项
          // enforce: true,
          reuseExistingChunk: true,
        },
      },
      //只有超过了这个字节的才会打包
      // 要不要打这个总包出来
      minSize: {
        javascript: 0,
        style: 0,
      },
      //经验值 拆掉abc ->总包
      maxSize: {
        javascript: 110000,
        style: 110000,
      },
    },
  },
  plugins: [new BundleAnalyzerPlugin()],
};

module.exports = webpackBaseConfig;
