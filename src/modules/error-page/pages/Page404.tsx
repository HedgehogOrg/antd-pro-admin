import React, { ReactElement } from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import intl from 'react-intl-universal';

export default function Page404(): ReactElement {
  const navigate = useNavigate();

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle={intl.get('MISSING_PAGE')}
        extra={<Button type="primary" onClick={() => navigate('/')}>{intl.get('BACK_TO_HOME')}</Button>}
      />
    </div>
  );
}
