const port = process.env.PORT
module.exports = {
  webpack: (config) => {
    config.output.library = 'demo1';
    config.output.libraryTarget = 'umd';
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
