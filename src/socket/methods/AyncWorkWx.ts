import SocketEvent from '@/socket/enums/AyncWorkWxEnum';
import { WorkFlowFormStore } from '@/stores/work';

export default [
  /**
   * 同步企业微信用户
   */
  {
    method: SocketEvent.SYNC_WORK_WECHAT_USER_SUCCESS,
    callback: () => {
      WorkFlowFormStore.setSyncFlag('success');
    },
  },
  {
    method: SocketEvent.SYNC_WORK_WECHAT_USER_FAILED,
    callback: () => {
      WorkFlowFormStore.setSyncFlag('fail');
    },
  },
  /**
   * 同步企业微信部门
   */
  {
    method: SocketEvent.SYNC_WORK_WECHAT_DEPT_SUCCESS,
    callback: () => {
      WorkFlowFormStore.setSyncFlag('success');
    },
  },
  {
    method: SocketEvent.SYNC_WORK_WECHAT_DEPT_FAILED,
    callback: () => {
      WorkFlowFormStore.setSyncFlag('fail');
    },
  },
];
