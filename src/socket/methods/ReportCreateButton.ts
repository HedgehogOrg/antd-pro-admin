import { message } from 'antd';
import SocketEvent from '@/socket/enums/ReportCreateButtonEnum';
import ReportGeneratorStore from '@/stores/report';
import { urlQuery2Json } from '@/utils/utils';

const myWorker = new SharedWorker('reportWorker.js', 'reportWorker');
// websocket 监听服务端生成报告
export default [
  {
    method: SocketEvent.GENERATE_PDF_SUCCESS,
    callback: () => {
      ReportGeneratorStore.setCreateStatus(true);
      message.success('提交报告成功');
      const params = urlQuery2Json();
      myWorker.port.postMessage({ id: params.id, status: false, generate: true });
      ReportGeneratorStore.replaceTextArea2div(true);
      setTimeout(() => {
        window.close();
      }, 1200);
    },
  },
  {
    method: SocketEvent.GENERATE_PDF_FAILED,
    callback: () => {
      ReportGeneratorStore.setCreateStatus(false);
      message.error('生成报告失败');
      ReportGeneratorStore.replaceTextArea2div(true);
      const params = urlQuery2Json();
      myWorker.port.postMessage({ id: params.id, status: false, generate: false });
    },
  },
];
