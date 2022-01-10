const { override, fixBabelImports, addWebpackPlugin } = require('customize-cra')
const addLessLoader = require('./plugins/addLessLoader_forCRA5')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const mockMiddleware = require('./mock/mock-middleware')

const port = process.env.PORT

module.exports = {
  webpack: override(
    (config) => {
      config.output.library = 'sd-department-admin-2';
      config.output.libraryTarget = 'umd';
      /* 用于 微前端 qiankun */
      // TODO: 上线前需修改
      config.output.publicPath = `http://localhost:${port}/`
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
    // 替换 moment 为 dayjs
    addWebpackPlugin(new AntdDayjsWebpackPlugin())
  ),
  devServer: override(
    (configFunction) => {
      return function(proxy, allowedHost) {
        const config = configFunction(proxy, allowedHost);
        config.headers = {
          'Access-Control-Allow-Origin': '*'
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
