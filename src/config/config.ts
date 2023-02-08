// 项目内业务相关的配置

const Config = {
  // API请求的baseUrl
  BASE_URL: process.env.BASE_URL,
  PROJECT_NAME: process.env.REACT_APP_PROJECT_NAME,
  WEBSOCKET_URL: localStorage.getItem('WEBSOCKET_URL')?.toString(),
  WEIXIN_MINI_PROGRAM_URL: localStorage.getItem('WEIXIN_MINI_PROGRAM_URL')?.toString(),

};

export default Config;
