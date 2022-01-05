// eslint-disable-next-line max-classes-per-file
import axios from 'axios';

// 不显示提示
const excludes = [
  '/operators/main/ping',
  '/operators/main/get_dashboard',
  '/operators/feeaccount/get',
  '/appstore/order/create',
  '/terminal/terminal/get_select_list',
  // 账号绑定微信检查
  '/operators/receiptaccount/get_wx_oauth',
  // 仓库管理-采购进货
  '/appstore/operationmonitoring/get',
  // 故障监控
  '/terminal/fault/dashboard',
  '/appstore/customizemenu/get',
  '/appstore/questionnaire/get',
  '/appstore/questionnaire/getQuestion',
  // 获取设备屏幕截图
  '/terminal/screenshot/get_screenshot',
];

// 不加入限制请求池的API
const poolExcludes = [
  // 我的分期 - 各种分期状态
  '/operators/loancontract/list',
  // 修改刷脸支付状态
  '/terminal/config/update_facepay',
  '/api',
];
// 请求池
class Pool {
  constructor() {
    this.removeTime = 1000;
    window.YP_REQUEST_POOL = {};
  }

  getItem(url) {
    return window.YP_REQUEST_POOL[url];
  }

  setItem(url) {
    if (window.YP_REQUEST_POOL[url]) {
      return;
    }
    window.YP_REQUEST_POOL[url] = true;
    setTimeout(() => {
      this.removeItem(url);
    }, this.removeTime);
  }

  removeItem(url) {
    delete window.YP_REQUEST_POOL[url];
  }
}

export default new class {
  install(vue) {
    const Vue = vue;
    const VueInstance = new Vue();
    const pool = new Pool();
    const { CancelToken } = axios;
    // 设置默认请求头
    axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
    // 请求前的拦截器
    axios.interceptors.request.use((config) => {
      const tmpConfig = config;
      let cancel;
      tmpConfig.cancelToken = new CancelToken((c) => {
        cancel = c;
      });
      if (tmpConfig.method.toLocaleLowerCase() === 'post' && !poolExcludes.includes(tmpConfig.url)) {
        if (pool.getItem(tmpConfig.url)) {
          cancel('REPEATED_REQUEST');
          console.warn(tmpConfig.url);
        } else {
          pool.setItem(tmpConfig.url);
        }
      }
      return tmpConfig;
    });
    // 返回前的拦截器
    axios.interceptors.response.use(
      (response) => {
        const { data, config } = response;
        let showMsg = excludes.indexOf(config.url) === -1;
        if (config.showMsg !== undefined) {
          if (config.showMsg) {
            showMsg = true;
          } else {
            showMsg = false;
          }
        }
        // 如果有error_code
        if (typeof data.error_code !== 'undefined') {
          const code = data.error_code;
          if (showMsg) {
            const msg = VueInstance.$t(`RESPONSE_MSG.${data.error_msg}`).replace('RESPONSE_MSG.', '');
            // 如果是get请求，error_code不为0时提示
            if (config.method === 'get') {
              if (code !== 0) {
                if (msg === 'ERR_SERVER_RESPONSE') {
                  VueInstance.$Message.error(data.data);
                } else {
                  VueInstance.$Message.error(msg);
                }
              }
            } else {
              // post请求成功与否都要提示
              const type = code === 0 ? 'success' : 'error';
              VueInstance.$Message[type](msg);
            }
          }
          // 会话过期，退出
          if (data.error_msg === 'ERR_SESSION_TIMEOUT') {
            // 品牌商 iframe 嵌套时需刷新顶层窗口
            if (window.top !== window.self) {
              // 发送消息给品牌商窗口，由于品牌商自定义域名的存在，所以 origin 设置 *
              window.top.postMessage('refresh', '*');
            } else {
              window.location.href = '/';
            }
          }
        }
        return response;
      },
      (error) => {
        if (error.message && error.message === 'REPEATED_REQUEST') {
          VueInstance.$Message.warning('点击太频繁了!');
        } else {
          VueInstance.$Message.error(VueInstance.$t('RESPONSE_MSG.ERR_NETWORK_FAIL').replace('RESPONSE_MSG.', ''));
        }
        return Promise.reject(error);
      },
    );
    // 注册$http
    Vue.prototype.$http = axios;
    // 注册$fetch
    Vue.prototype.$fetch = function fetch(url = '', method = 'get', params = {}) {
      return new Promise((resolve) => {
        this.$http[method](url, params).then((response) => {
          const { data } = response;
          if (data.data) {
            resolve(data.data);
          } else {
            resolve(response);
          }
        });
      });
    };
  }
}();
