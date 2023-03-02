import {
  useCallback, useRef, useState,
} from 'react';
import {
  Steps, Modal, message,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CreateRoleRequestType, RoleItem } from '@/types/stores/role';
import { BasicInfo, RolePermission, DataScope } from '../components';
import { useIntl } from '@/utils/intl';
import RoleFetch from '@/apis/RoleFetch';
import WithConfigProvider from '@/components/WithConfigProvider';
import styles from './common.module.less';

const { Step } = Steps;
const { confirm } = Modal;

function CreateRole() {
  const t = useIntl('role');
  const navigate = useNavigate();
  const [current, setCurrent] = useState<number>(0);
  const [roleData, setRoleData] = useState<CreateRoleRequestType>({
    name: '',
    description: '',
    aclIds: [],
    scopeType: 0,
    organizationIds: [],
    type: 0,
  });
  const refInfo = useRef<{ handleValidate(): void }>(null);
  const refPermission = useRef<{ handleValidate(): void }>(null);

  const handleStepClick = async (step: number) => {
    // 点击当前步骤之前的步骤，直接跳转
    if (step <= current) {
      setCurrent(step);
      return;
    }

    // 点击当前步骤之后的步骤，只需要校验[current, step)之间的步骤
    const validaters = [refInfo.current?.handleValidate, refPermission.current?.handleValidate];
    const promises = validaters.slice(current, step).map((handler) => handler && handler());

    Promise.all(promises).then((res) => {
      res.forEach((data) => {
        setRoleData(Object.assign(roleData, data));
      });
      setCurrent(step);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handlePrevStep = useCallback(() => {
    setCurrent(current - 1);
  }, [current]);

  const handleNextStep = useCallback((data: Partial<RoleItem>) => {
    setRoleData(Object.assign(roleData, data));
    setCurrent(current + 1);
  }, [current]);

  const handleCancel = () => {
    confirm({
      title: t('CANCEL_CREATE'),
      icon: <ExclamationCircleOutlined />,
      content: t('CANCEL_CREATE_MESSAGE'),
      cancelText: t('CANCEL'),
      okText: t('CONFIRM'),
      onOk() {
        navigate(-1);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleSubmit = useCallback((data: Partial<RoleItem>): Promise<RoleItem> => {
    setRoleData(Object.assign(roleData, data));

    return new Promise((resolve, reject) => {
      RoleFetch.create(roleData)
        .then((res) => {
          message.success(t('CREATE_SUCCESS_MESSAGE'));
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, []);

  return (
    <WithConfigProvider>
      <div className={styles.container}>
        <Steps current={current} size="small" className={styles.steps} onChange={handleStepClick}>
          <Step title={t('STEP1_TITLE')} description={t('STEP1_DESC')} />
          <Step title={t('STEP2_TITLE')} description={t('STEP2_DESC')} />
          <Step title={t('SETP3_TITLE')} description={t('STEP3_DESC')} />
        </Steps>

        <div className={`${styles['steps-content']}, ${current !== 0 ? styles.hide : null}`}>
          <BasicInfo
            ref={refInfo}
            onNext={(data) => handleNextStep(data)}
            onCancel={handleCancel}
          />
        </div>
        <div className={`${styles['steps-content']}, ${current !== 1 ? styles.hide : null}`}>
          <RolePermission
            ref={refPermission}
            onPrevious={handlePrevStep}
            onNext={(data) => handleNextStep(data)}
            onCancel={handleCancel}
          />
        </div>
        <div className={`${styles['steps-content']}, ${current !== 2 ? styles.hide : null}`}>
          <DataScope
            onPrevious={handlePrevStep}
            onSubmit={(data) => handleSubmit(data)}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </WithConfigProvider>
  );
}

export default CreateRole;
