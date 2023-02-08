import { io } from 'socket.io-client';
import WebsocketStore from '@/stores/websocket/WebsocketStore';
import { getWebsocketTokens } from '@/apis/common';
import Config from '@/config/config';
import socketMethods from '@/socket/methods';
import UserStore from '@/stores/auth/UserStore';

// const closeFlag = false;
const webSocket = (function () {
  let instance:any;// socket实例
  let isSelfClose = false;// 是否主动关闭默认false 主动关闭不自动重连
  const count = 3; // 总共重连的次数
  let reconnectCount = 0; // 重连计数器
  let lastReconnect = false; // 是否尝试获取最新visitorId重连token、
  function createInstance() {
    const { visitorId, websocketToken } = WebsocketStore.getCurrentWebsocketToken();
    if (visitorId && websocketToken) {
      // console.log('获取本地socket_token');
      return new Promise((resolve) => {
        const url = `${Config.WEBSOCKET_URL}?token=${websocketToken?.token}&type=${websocketToken?.type}&visitorId=${websocketToken?.visitorId}`;
        const socket = io(url, { transports: ['websocket'], timeout: 21000 });
        resolve(socket);
      });
    }
    // console.log('获取最新token');
    return getWebsocketTokens({}).then((result:any) => {
      const newWebsocketToken:any = result?.data || null;
      WebsocketStore.setWebsocketToken(newWebsocketToken);
      // console.log('缓存本地sockettoken', localStorage.getItem('SOCKET_TOKEN'));
      const url = `${Config.WEBSOCKET_URL}?token=${newWebsocketToken?.token}&type=${`${newWebsocketToken?.type}`}&visitorId=${newWebsocketToken?.visitorId}`;
      const socket = io(url, { transports: ['websocket'], timeout: 21000 });
      return Promise.resolve(socket);
    });
  }
  async function reconnect(cb?:Function) {
    if (!isSelfClose) {
      if (reconnectCount < count) {
        reconnectCount++;
        // console.log('尝试使用本地旧的的visitorId重连', reconnectCount);
        if (cb) {
          cb();
        }
      }
      // 当使用本地旧的的visitorId重连达到最大重连次数后 并且未尝试获取新的visitorId重连
      if (reconnectCount === count && !lastReconnect) {
        lastReconnect = true;
        // console.log('尝试获取新的visitorId重连', reconnectCount);
        WebsocketStore.setWebsocketToken(null);
        if (cb) {
          await cb();
        }
      }
    }
  }
  return {
    async getInstance() {
      if (UserStore.token) {
        if (!instance) {
          try {
            instance = (await createInstance() as any).connect();
            // 创建socket
            instance.on('connect', async () => {
              isSelfClose = false;
              reconnectCount = 0;
              lastReconnect = false;
              // console.log('连接-connect', instance);
              // WebsocketStore.setSocket(instance);
              socketMethods.forEach((socketMethod:any) => {
                instance.on(socketMethod.method, (data:any) => {
                  socketMethod?.callback(JSON.parse(data));
                });
              });
            });
            // 链接失败
            instance.on('connect_error', async () => {
              // console.log('连接-失败');
              // 清除所有监听事件
              this.disconnectSocket(false);
              reconnect(() => {
                this.getInstance();
              });
            });
            // 监听超时等断开链接问题
            instance.on('disconnect', () => {
              // console.log('断开连接-disconnect');
              // 清除所有监听事件
              this.disconnectSocket(false);
              reconnect(() => {
                this.getInstance();
              });
            });
          } catch (error) {
            WebsocketStore.setWebsocketToken(null);
          }
        }
      }

      // console.log('socket', instance);
      return instance;
    },
    disconnectSocket: (selfClose:boolean = true) => {
      if (instance) {
        // 移除监听的事件
        instance.offAny();
        // 断开连接
        // instance.close();
        instance.disconnect();
      }
      isSelfClose = isSelfClose ? true : selfClose;
      instance = null;
      // 主动关闭 自动清空sock配置
      if (selfClose) {
        reconnectCount = 0;
        lastReconnect = false;
        // WebsocketStore.setWebsocketToken(null);
      }
      return instance;
    },
  };
}());

export default webSocket;
