const port = process.env.PORT
/* 用于 微前端 qiankun */
module.exports = {
  webpack: (config) => {
    config.output.library = 'sd-department-admin-2';
    config.output.libraryTarget = 'umd';
    // TODO: 上线前需修改
    config.output.publicPath = `http://localhost:${port}/`
    return config;
  },
  devServer: (configFunction) => {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = {
        'Access-Control-Allow-Origin': '*'
      }
      return config;
    }
  }
}
