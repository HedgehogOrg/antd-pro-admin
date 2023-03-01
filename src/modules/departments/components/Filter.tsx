/*
 * Author: Alvin
 * Modified By: diya
 * Created Date: 2022-04-15 14:03:36
 * Last Modified: 2022-04-26 16:33:29
 * Description:
 */
import React from 'react';
import { Input, Form, Button } from 'antd';
import { useIntl } from '@/utils/intl';
import styles from './index.module.less';

type Props = {
  search?: string,
  onSearch: (search: string | string[]) => void,
  onReset: () => void
};

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export default function Filter(props: Props) {
  const {
    search, onSearch, onReset,
  } = props;

  const i18n = useIntl('department');
  const [form] = Form.useForm();

  const onSearchHandler = () => {
    const values = form.getFieldsValue();
    const { search: key } = values;
    onSearch(key);
  };

  const onResetHandler = () => {
    form.setFieldsValue({ search: undefined });
    onReset();
  };

  return (
    <div className={styles.search}>
      <div className={styles.form}>
        <Form form={form} {...layout}>
          <FormItem label={i18n('DEPARTMENT_NAME')} name="search" initialValue={search}>
            <Input placeholder={i18n('DEPARTMENT_SEARCH_PLACEHOLDER')} allowClear />
          </FormItem>
        </Form>
      </div>
      <div className={styles.buttons}>
        <Button className={styles.button} onClick={onResetHandler}>{i18n('RESET')}</Button>
        <Button className={styles.button} type="primary" onClick={onSearchHandler}>{i18n('QUERY')}</Button>
      </div>
    </div>
  );
}
