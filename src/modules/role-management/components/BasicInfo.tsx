import {
  useState, useEffect, forwardRef, useImperativeHandle, memo,
} from 'react';
import {
  Form, Input, Button, Row, Col, message, Skeleton,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { RoleItem, GetRoleItemResponseType } from '@/types/stores/role';
import { useIntl } from '@/utils/intl';
import RoleFetch from '@/apis/RoleFetch';
import { replaceSpace } from '@/utils/validate';
import styles from './index.module.less';

type PropTypes = {
  id?: number,
  roleData?: Partial<GetRoleItemResponseType>,
  onNext: (data: Partial<RoleItem>) => void,
  onCancel: VoidFunction,
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

function BasicInfo(props: PropTypes, ref: any) {
  const t = useIntl('role');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {
    id, roleData, onNext, onCancel,
  } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [requesting, setRequesting] = useState<boolean>(false);

  const validateRules = [
    {
      required: true,
      message: t('FORM_VALIDATE_MESSAGE'),
    },
    replaceSpace(form, 'name'),
  ];

  useImperativeHandle(ref, () => ({
    handleValidate,
  }));

  const handleValidate = async () => {
    try {
      const data = await form.validateFields();

      // 避免网络较慢时重复点击发送请求
      if (requesting) return await Promise.reject();

      return await new Promise((resolve, reject) => {
        setRequesting(true);

        RoleFetch.isRoleExist({ id, name: data.name.trim() })
          .then((res) => {
            if (!res.isExist) {
              resolve(data);
            } else {
              message.error(t('ROLE_ALREADY_EXIST'));
              reject('Role Already Exist');
            }
          }).catch((err) => {
            Promise.reject(err);
          }).finally(() => {
            setRequesting(false);
          });
      });
    } catch {
      return Promise.reject('Validate Failed');
    }
  };

  const handleNextStep = async () => {
    try {
      const data = await form.validateFields();

      if (!data.errorFields) {
        setLoading(true);
        RoleFetch.isRoleExist({ id, name: data.name.trim() })
          .then((res) => {
            if (!res.isExist) {
              onNext(data);
            } else {
              message.error(t('ROLE_ALREADY_EXIST'));
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } catch {
      console.log('Validate Failed');
    }
  };

  const handleCancel = () => {
    const name = form.getFieldValue('name');
    const description = form.getFieldValue('description');

    // 新建角色时，如果没填写内容，直接返回上一页
    if (!id && !name && !description) {
      navigate(-1);
    } else {
      onCancel();
    }
  };

  useEffect(() => {
    if (roleData && roleData.name) {
      form.setFieldsValue({
        name: roleData.name,
        description: roleData.description,
      });
    }
  }, [roleData]);

  const SkeletonComponent = (
    <>
      <Skeleton active paragraph={{ rows: 4 }} />
      <Skeleton.Button className={styles['skeleton-btn']} />
      <Skeleton.Button />
    </>
  );

  const FormComponent = (
    <>
      <Form form={form} {...formItemLayout}>
        <Form.Item label={t('ROLE_NAME')} name="name" rules={validateRules} hasFeedback required>
          <Input placeholder={t('ROLE_NAME_PLACEHOLDER')} maxLength={20} />
        </Form.Item>
        <Form.Item label={t('ROLE_DESC')} name="description" className={styles['form-textarea']}>
          <Input.TextArea placeholder={t('ROLE_DESC_PLACEHOLDER')} className={styles.textarea} maxLength={50} showCount />
        </Form.Item>
      </Form>

      <Row>
        <Col sm={{ span: 6 }} xs={{ span: 0 }} />
        <Col sm={{ span: 18 }} xs={{ span: 24 }}>
          <div className={styles['steps-action']}>
            <Button
              type="primary"
              className={styles['step-button']}
              onClick={handleNextStep}
              loading={loading}
            >
              {t('NEXT_STEP')}
            </Button>
            <Button
              className={styles['step-button']}
              onClick={handleCancel}
            >
              {t('CANCEL')}
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );

  return (
    <div className={styles['basic-info']}>
      {id && !roleData?.name ? SkeletonComponent : FormComponent }
    </div>
  );
}

export default memo(forwardRef(BasicInfo));
