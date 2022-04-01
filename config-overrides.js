const { override, fixBabelImports, addWebpackPlugin, addWebpackAlias } = require('customize-cra')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const addLessLoader = require('./plugins/addLessLoader_forCRA5')
const mockMiddleware = require('./plugins/mock-middleware')
const pkg = require('./package.json')
const path = require('path')

process.env.REACT_APP_PROJECT_NAME = pkg.name

module.exports = {
  webpack: override(
    (config) => {
      config.output.library = pkg.name;
      config.output.libraryTarget = 'umd';
      /* 用于 微前端 qiankun */
      config.output.publicPath = process.env.REACT_APP_PUBLIC_PATH
      return config;
    },
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true, //自动打包相关的样式 默认为 style:'css'
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        // modifyVars: { "@primary-color": "#1DA57A" }, // 修改默认主题
      }
    }),
    // 路径别名，紧密耦合的文件/组件建议用相对路径引入
    addWebpackAlias({
      "@": path.resolve(__dirname, "src")
    }),
    // 替换 moment 为 dayjs
    addWebpackPlugin(new AntdDayjsWebpackPlugin())
  ),
  devServer: override(
    (configFunction) => {
      return function(proxy, allowedHost) {
        const config = configFunction(proxy, allowedHost);
        config.headers = {
          /* 用于 微前端 qiankun 开发*/
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Method': 'GET, HEAD, OPTIONS, POST, PUT',
          'Access-Control-Allow-Headers': '*'
        }
        config.setupMiddlewares = (middlewares, devServer) => {
          /* mock */
          middlewares.push(mockMiddleware)
          return middlewares;
        }
        return config;
      }
    }
  )
}
