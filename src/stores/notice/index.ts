import { makeAutoObservable } from 'mobx';
import { NoticeTypesEnum } from '@/components/Notice/enum';
import NoticeFetch from '@/apis/NoticeFetch';
import userStore from '../auth/UserStore';

class NoticeStore {
  public drawerVisible: boolean = false;

  public unreadCount: number = 0;

  public unreadData: { kind: NoticeTypesEnum, count: number }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setDrawerVisible(status: boolean) {
    this.drawerVisible = status;
  }

  setUnreadCount(count: number) {
    this.unreadCount = count;
  }

  setUnreadData(data: any) {
    this.unreadData = data;
  }

  fetchNoticeData() {
    const { id, organizationId } = userStore.user;

    NoticeFetch.unreadCount({
      accountId: id,
      organizationId,
    }).then((res) => {
      const total = res.reduce((sum, item) => sum + item.count, 0);
      this.setUnreadCount(total);
      this.setUnreadData(res);
    });
  }
}

export default new NoticeStore();
