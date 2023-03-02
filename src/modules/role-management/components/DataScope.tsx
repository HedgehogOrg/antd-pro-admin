import { useEffect, useState, memo } from 'react';
import {
  Form, Select, Radio, Button, Row, Col, Space, Checkbox, Switch, Modal,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  RoleItem, GetRoleItemResponseType, OrganizationItem, RoleOrganizationItem,
} from '@/types/stores/role';
import { useIntl } from '@/utils/intl';
import RoleFetch from '@/apis/RoleFetch';
import styles from './index.module.less';

type PropTypes = {
  id?: number,
  roleData?: Partial<GetRoleItemResponseType>,
  onPrevious: VoidFunction,
  onCancel: VoidFunction,
  onSubmit: (data: Partial<RoleItem>) => Promise<any>,
};

const { Option } = Select;
const { confirm } = Modal;

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

function DataScope(props: PropTypes) {
  const t = useIntl('role');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [allOrgs, setAllOrgs] = useState<OrganizationItem[]>([]);
  const [allOrgids, setAllOrgids] = useState<number[]>([]);
  const [selectedOrgs, setSelectedOrgs] = useState<number[]>([]);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    id, roleData, onPrevious, onSubmit, onCancel,
  } = props;

  const handleSelectChange = (value: number[]) => {
    setSelectedOrgs(value);
  };

  const onCheckAllChange = (value: boolean) => {
    const selected = value ? allOrgids : [];

    setSelectedOrgs(selected);
    form.setFieldsValue({
      organizationIds: selected,
    });
  };

  const handlePrevStep = () => {
    onPrevious();
  };

  const submit = (data: Partial<RoleItem>) => {
    onSubmit(data).then(() => {
      navigate(-1);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  };

  const handleSubmit = async () => {
    const data = await form.validateFields();
    setLoading(true);
    // 先校验默认角色是否已经存在
    const response = await RoleFetch.isRoleExist({ id, type: 1 });
    if (data.type && response.isExist) {
      confirm({
        title: t('PROMPT'),
        icon: <ExclamationCircleOutlined />,
        content: t('DEFAULT_ROLE_EXIST'),
        cancelText: t('CANCEL'),
        okText: t('CONFIRM'),
        onOk() {
          submit(data);
        },
        onCancel() {
          setLoading(false);
        },
      });

      return;
    }

    submit(data);
  };

  const handleCancel = () => {
    onCancel();
  };

  const dropdownRender = (menu: any) => (
    <>
      {allOrgids.length > 0 && (
        <Space style={{ padding: '3px 12px' }}>
          <Checkbox
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={(e) => onCheckAllChange(e.target.checked)}
          >
            {t('CHECKALL')}
          </Checkbox>
        </Space>
      )}
      {menu}
    </>
  );

  useEffect(() => {
    if (selectedOrgs.length) {
      if (selectedOrgs.length === allOrgids.length) {
        setIndeterminate(false);
        setCheckAll(true);
      } else {
        setCheckAll(false);
        setIndeterminate(true);
      }
    } else {
      setCheckAll(false);
      setIndeterminate(false);
    }
  }, [selectedOrgs]);

  useEffect(() => {
    if (roleData) {
      let ids: number[] = [];
      if (roleData.organizations) {
        ids = roleData.organizations.map((item: RoleOrganizationItem) => item.organizationId);
      }
      form.setFieldsValue({
        scopeType: roleData.scopeType,
        organizationIds: ids,
        type: roleData.type === 1,
      });
      handleSelectChange(ids);
    }
  }, [roleData]);

  useEffect(() => {
    let mounted = true;

    RoleFetch.getAllOrganizations({ attributes: ['id', 'name'] })
      .then((res) => {
        if (mounted) {
          setAllOrgs(res);
          setAllOrgids(res.map((item: OrganizationItem) => item.id));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => { mounted = false; };
  }, []);

  return (
    <div className={styles['data-scope']}>
      <Form form={form} {...formItemLayout} initialValues={{ scopeType: 0 }}>
        <Form.Item name="scopeType" label={t('SCOPE_TYPE')} required>
          <Radio.Group>
            <Space direction="vertical" size="middle" style={{ paddingTop: '6px' }}>
              <Radio value={0}>{t('SCOPE1')}</Radio>
              <Radio value={1}>{t('SCOPE2')}</Radio>
              <Radio value={2}>{t('SCOPE3')}</Radio>
              <Radio value={3}>{t('SCOPE4')}</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          className={styles['form-select']}
          label={t('ORG_LABEL')}
          name="organizationIds"
          extra={t('ORG_TIP')}
          hasFeedback={false}
        >
          <Select
            mode="multiple"
            onChange={(value) => handleSelectChange(value)}
            dropdownRender={dropdownRender}
            optionLabelProp="title"
            placeholder={t('ORG_PLACEHOLDER')}
            filterOption={(input, option) => {
              if (!option) { return false; }
              const label = option.label?.toString().toLowerCase();
              return !!label && label.indexOf(input.toLowerCase()) > -1;
            }}
          >
            {
              allOrgs.map((org) => (
                <Option value={org.id} title={org.name} className={styles.option} key={org.id}>
                  <Checkbox checked={selectedOrgs.includes(org.id)} />
                  <Space style={{ padding: '0 8px' }}>{org.name}</Space>
                </Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item name="type" label="默认角色" valuePropName="checked">
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>
      </Form>

      <Row>
        <Col sm={{ span: 6 }} xs={{ span: 0 }} />
        <Col sm={{ span: 18 }} xs={{ span: 24 }}>
          <div className={styles['steps-action']}>
            <Button
              className={styles['step-button']}
              onClick={handlePrevStep}
            >
              {t('PREV_STEP')}
            </Button>
            <Button
              type="primary"
              className={styles['step-button']}
              onClick={handleSubmit}
              loading={loading}
            >
              {t('SAVE')}
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
    </div>
  );
}

export default memo(DataScope);
