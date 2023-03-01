import React from 'react';
import { notification, Button } from 'antd';
import { secondToString, secondToDate } from '@/utils/utils';

const ONEDAYSECOND = 86400;

export function SleepPrescriptionNotice(props: { data: any }) {
  /*  --------------------------------睡眠处方 sleepPrescription通知提醒栏---------------------------------  */
  const openNotification = async () => {
    const { data } = props;
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        知道了
      </Button>
    );
    let tempDuration: number = 0;
    const { goToBedAt, getUpAt, name } = data;
    if (goToBedAt > getUpAt) {
      tempDuration = getUpAt - goToBedAt + ONEDAYSECOND;
    } else {
      tempDuration = getUpAt - goToBedAt;
    }
    const message = (
      <div style={{ fontSize: 16, padding: 8 }}>
        <span style={{ color: '#2F54EB', fontSize: 16 }}>
          {' '}
          {name}
          {' '}
        </span>
        获取了睡眠处方（处方时长：
        <span style={{ fontSize: 14 }}>
          {' '}
          {secondToString(tempDuration)}
          {' '}
        </span>
        ）
      </div>
    );
    const description = (
      <div>
        <p>
          上床时间:&emsp;
          {secondToDate(data?.goToBedAt)}
        </p>
        <p>
          起床时间:&emsp;
          {secondToDate(data?.getUpAt)}
        </p>
      </div>
    );
    notification.open({
      message,
      description,
      btn,
      key,
      duration: null,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  return openNotification();
}
