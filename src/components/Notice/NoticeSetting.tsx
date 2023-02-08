import {
  Card, Form, Switch, TimePicker, InputNumber, message,
} from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import WithConfigProvider from '../WithConfigProvider';
import NoticeSettingFetch from '@/apis/NoticeSettingFetch';
import { NoticeSettingType, AllSettingsType } from './type';
import { useUser } from '@/hooks';
import { deepClone } from '@/utils/utils';
import { clearDeep } from './helper';
import AuthButton from '../AuthButton';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 7 },
    lg: { span: 6 },
    xl: { span: 4 },
    xxl: { span: 3 },
  },
};

const titleStyle = {
  paddingLeft: '16px',
  borderLeft: '3px solid #2F54EB',
  fontWeight: 'bold',
};

const inlineInputStyle = {
  display: 'inline-block',
  width: '90px',
  margin: '0 8px',
};

function NoticeSetting() {
  const [form] = Form.useForm();
  const localUser = useUser();
  const { id: creatorId, organizationId } = localUser;
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [detail, setDetail] = useState<NoticeSettingType>({} as NoticeSettingType);

  const onFormChange = (_: any, allValues: AllSettingsType) => {
    const tempValues: AllSettingsType = deepClone(allValues);

    if (tempValues.programSetting?.pushTime !== undefined && tempValues.programSetting?.pushTime !== null) {
      tempValues.programSetting.pushTime = moment(tempValues.programSetting.pushTime).unix() - moment().startOf('day').unix();
    }

    if (tempValues.sleepSetting?.pushTime !== undefined && tempValues.sleepSetting?.pushTime !== null) {
      tempValues.sleepSetting.pushTime = moment(tempValues.sleepSetting.pushTime).unix() - moment().startOf('day').unix();
    }

    clearDeep(tempValues);
    setDetail({
      ...detail,
      ...tempValues,
    });
  };

  const onSubmit = () => {
    setLoading(true);

    if (isEdit) {
      if (detail.id) {
        const { id } = detail;
        NoticeSettingFetch.update(id, { ...detail }).then(() => {
          message.success('保存成功');
          setLoading(false);
        }).catch(() => {
          setLoading(false);
        });
      }
    } else {
      NoticeSettingFetch.create(detail).then(() => {
        message.success('保存成功');
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    NoticeSettingFetch.getSettingDetail({ organizationId, creatorId })
      .then((res) => {
        if (res) {
          const clonedRes = deepClone(res);
          const { programSetting, sleepSetting } = clonedRes;

          if (programSetting?.pushTime !== undefined) {
            const seconds = moment().startOf('day').unix() + (programSetting.pushTime as number);
            programSetting.pushTime = moment(seconds * 1000);
          }

          if (sleepSetting?.pushTime !== undefined) {
            const seconds = moment().startOf('day').unix() + (sleepSetting.pushTime as number);
            sleepSetting.pushTime = moment(seconds * 1000);
          }

          form.setFieldsValue({
            programSetting,
            sleepSetting,
          });
          setIsEdit(true);
          setDetail(res);
        } else {
          setDetail({
            organizationId,
            creatorId,
          } as NoticeSettingType);
        }
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <WithConfigProvider>
      <Card bodyStyle={{ paddingLeft: 0 }}>
        <Form {...formItemLayout} form={form} onValuesChange={onFormChange} onFinish={onSubmit}>
          {/* ========== 方案消息设置 =========== */}
          <div style={titleStyle}>方案消息</div>
          <div style={{ marginTop: '24px', paddingLeft: '16px' }}>
            <Form.Item label="选择推送时间" name={['programSetting', 'pushTime']}>
              <TimePicker format="HH:mm" allowClear />
            </Form.Item>

            <Form.Item
              label="方案完成率低提醒"
              name={['programSetting', 'completeProgress', 'status']}
              valuePropName="checked"
              extra={(
                <span style={{ fontSize: '12px' }}>
                  开启后，将会在患者方案完成度低于设置的条件时通过消息推送的方式提醒您处理，关闭则不会提醒
                </span>
              )}
            >
              <Switch />
            </Form.Item>

            <Form.Item label={<span />} colon={false}>
              <span style={{ lineHeight: '32px' }}>患者连续</span>
              <Form.Item
                name={['programSetting', 'completeProgress', 'continuousDays']}
                style={inlineInputStyle}
                rules={[{ required: !!detail?.programSetting?.completeProgress?.status, message: '开启时必填' }]}
              >
                <InputNumber min={1} max={1000} placeholder="请输入" disabled={!detail?.programSetting?.completeProgress?.status} />
              </Form.Item>
              <span style={{ lineHeight: '32px' }}>天，任务完成度低于</span>
              <Form.Item
                name={['programSetting', 'completeProgress', 'lessPercent']}
                style={inlineInputStyle}
                rules={[{ required: !!detail?.programSetting?.completeProgress?.status, message: '开启时必填' }]}
              >
                <InputNumber min={1} max={100} placeholder="请输入" disabled={!detail?.programSetting?.completeProgress?.status} />
              </Form.Item>
              <span style={{ lineHeight: '32px' }}>%，提醒处理</span>
            </Form.Item>

            <Form.Item
              label="方案关闭提醒"
              name={['programSetting', 'closeRemind', 'status']}
              valuePropName="checked"
              extra={(
                <span style={{ fontSize: '12px' }}>
                  开启后，将会在方案即将关闭时通过消息推送的方式提醒你处理，关闭则不会提醒
                </span>
              )}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label={<span />}
              colon={false}
            >
              <span style={{ lineHeight: '32px' }}>距离方案关闭还剩</span>
              <Form.Item
                name={['programSetting', 'closeRemind', 'closeDays']}
                style={inlineInputStyle}
                rules={[{ required: !!detail?.programSetting?.closeRemind?.status, message: '开启时必填' }]}
              >
                <InputNumber min={1} max={1000} placeholder="请输入" disabled={!detail?.programSetting?.closeRemind?.status} />
              </Form.Item>
              <span style={{ lineHeight: '32px' }}>天，提醒处理</span>
            </Form.Item>

          </div>

          {/* ========== 睡眠消息设置 =========== */}
          <div style={titleStyle}>睡眠消息</div>
          <div style={{ marginTop: '24px', paddingLeft: '16px' }}>
            <Form.Item label="选择推送时间" name={['sleepSetting', 'pushTime']}>
              <TimePicker format="HH:mm" allowClear />
            </Form.Item>

            <Form.Item
              label="睡眠处方执行不佳提醒"
              name={['sleepSetting', 'badSleepPrescription', 'status']}
              valuePropName="checked"
              extra={(
                <span style={{ fontSize: '12px' }}>
                  开启后，将会在患者睡眠总时长与睡眠处方相差至设置的条件时，通过消息推送的方式提醒您处理，关闭则不会提醒
                </span>
              )}
            >
              <Switch />
            </Form.Item>

            <Form.Item label={<span />} colon={false}>
              <span style={{ lineHeight: '32px' }}>患者连续</span>
              <Form.Item
                name={['sleepSetting', 'badSleepPrescription', 'continuousDays']}
                style={inlineInputStyle}
                rules={[{ required: !!detail?.sleepSetting?.badSleepPrescription?.status, message: '开启时必填' }]}
              >
                <InputNumber min={1} max={1000} placeholder="请输入" disabled={!detail?.sleepSetting?.badSleepPrescription?.status} />
              </Form.Item>
              <span style={{ lineHeight: '32px' }}>天，睡眠总时长与睡眠处方相差</span>
              <Form.Item
                name={['sleepSetting', 'badSleepPrescription', 'differMinutes']}
                style={inlineInputStyle}
                rules={[{ required: !!detail?.sleepSetting?.badSleepPrescription?.status, message: '开启时必填' }]}
              >
                <InputNumber min={1} max={86400} placeholder="请输入" disabled={!detail?.sleepSetting?.badSleepPrescription?.status} />
              </Form.Item>
              <span style={{ lineHeight: '32px' }}>分钟，提醒处理</span>
            </Form.Item>
          </div>

          <Form.Item style={{ marginTop: '48px' }} label={<span />} colon={false}>
            <AuthButton aclsid="noticeSetting.EDIT" type="primary" htmlType="submit" style={{ marginLeft: 16 }} loading={loading}>保存</AuthButton>
          </Form.Item>
        </Form>
      </Card>
    </WithConfigProvider>
  );
}

export default NoticeSetting;
