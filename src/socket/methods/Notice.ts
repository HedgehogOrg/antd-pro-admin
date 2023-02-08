import { SleepPrescriptionNotice } from '@/components/Notice/wait2HandleQueues/SleepPrescription';
// import Config from '@/config/config';
// import { Platform } from '@/enums';
import SocketEvent from '@/socket/enums/NoticeEnum';
// import { AsyncTasksResponseType } from '@/types/socket';
import NoticeStore from '@/stores/notice';

const methods:any[] = [
  // 睡眠处方消息通知
  {
    activeEnv: 'ORGANIZATION',
    method: SocketEvent.CREATE_SLEEP_PRESCRIPTION,
    callback: (data:any) => {
      setTimeout(() => {
        SleepPrescriptionNotice(data);
      }, 1200);
    },
  },
  // 系统消息通知
  {
    activeEnv: 'ORGANIZATION',
    method: SocketEvent.SYSTEM_NOTICE_SUCCESS,
    // res: AsyncTasksResponseType
    callback: () => {
      // console.log('=====收到系统消息通知=====', res);
      NoticeStore.fetchNoticeData();
    },
  },
];

// if (Config.PLATFORM === Platform.CONSOLE) {
methods.forEach((val:any, index:number) => {
  if (val?.activeEnv === 'ORGANIZATION') {
    methods.splice(index, 1);
  }
});
// }

export default [
  ...methods,
];
