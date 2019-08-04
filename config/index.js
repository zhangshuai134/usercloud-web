
const path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    host: 'localhost',
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/wp': {
        // target: 'http://172.30.91.121:8082',
        target: 'http://172.30.10.143:18088',
        changeOrigin: true,
        pathRewrite: {
          '^/wp/': '/'
        }
      },
      '/yc': {
        // target: 'http://172.30.91.121:8082',
        target: 'http://172.30.10.143:18088',
        changeOrigin: true,
        pathRewrite: {
          '^/yc/': '/'
        }
      },
      '/proxy': {
        // target: 'http://172.30.91.121:8082',
        target: 'http://172.30.10.143:18088',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy/': '/'
        }
      },
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true
      }
    },

    cssSourceMap: false
  },

  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // 是否启动文件压缩
    productionGzip: false,
    showEslintErrorsInOverlay: false,
    productionGzipExtensions: ['js', 'css', 'svg'],
    // 模块分析报告
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
