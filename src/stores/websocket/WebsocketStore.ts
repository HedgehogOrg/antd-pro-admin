import { ActionType } from '@ant-design/pro-table';
import { makeAutoObservable } from 'mobx';
import { WebsocketToken } from '@/types/common';
import UserStore from '../auth/UserStore';

class WebsocketStore {
  visitorId:string;

  websocketToken:WebsocketToken | null;

  socket:any = null;

  tableRef:ActionType | undefined; // 当前页面表格

  loading:boolean = false;

  tips:string = '';

  progress:number = 0;

  constructor() {
    // 响应式处理
    makeAutoObservable(this);
    const localVisitorId = localStorage.getItem(`VISITOR_ID_${UserStore.user.id}`) || '';
    const localWebsocketToken:WebsocketToken | null = localStorage.getItem(`SOCKET_TOKEN_${UserStore.user.id}`) ? JSON.parse(localStorage.getItem('SOCKET_TOKEN') || '{}') : null;
    this.visitorId = localVisitorId;
    this.websocketToken = localWebsocketToken;
  }

  setSocket(newSocket:any) {
    this.socket = newSocket;
  }

  setTableRef(newTableRef:ActionType | undefined) {
    this.tableRef = newTableRef;
  }

  setVisitorId(newVisitorId:string) {
    this.visitorId = newVisitorId;
    localStorage.setItem(`VISITOR_ID_${UserStore.user.id}`, this.visitorId);
  }

  removeVisitorId() {
    this.visitorId = '';
    localStorage.removeItem(`VISITOR_ID_${UserStore.user.id}`);
  }

  setWebsocketToken(newWebsocketToken:WebsocketToken | null) {
    this.websocketToken = newWebsocketToken;
    if (newWebsocketToken) {
      localStorage.setItem(`SOCKET_TOKEN_${UserStore.user.id}`, JSON.stringify(this.websocketToken));
      // 动态设置 VisitorId 时，只修改localStorage是不会同步到store的，跟初始化赋值不一样，需要手动把store也改了
      this.setVisitorId(this.websocketToken?.visitorId || '');
    } else {
      localStorage.removeItem(`SOCKET_TOKEN_${UserStore.user.id}`);
      this.removeVisitorId();
    }
  }

  getCurrentWebsocketToken():{ visitorId:string, websocketToken:WebsocketToken | null } {
    const userId = UserStore.user.id;
    const localVisitorId = localStorage.getItem(`VISITOR_ID_${userId}`) || '';
    const localWebsocketToken:WebsocketToken | null = localStorage.getItem(`SOCKET_TOKEN_${userId}`) ? JSON.parse(localStorage.getItem(`SOCKET_TOKEN_${userId}`) || '{}') : null;
    this.visitorId = localVisitorId;
    this.websocketToken = localWebsocketToken;
    return {
      visitorId: localVisitorId,
      websocketToken: localWebsocketToken,
    };
  }

  setLoading(newLoading:boolean) {
    this.loading = newLoading;
    if (!this.loading) {
      // 重置状态
      this.setProgress(0);
      this.setTips('');
    }
  }

  // 进度
  setProgress(progress: number) {
    this.progress = progress;
  }

  // 文字提示
  setTips(tips: string) {
    this.tips = tips;
  }
}

export default new WebsocketStore();
