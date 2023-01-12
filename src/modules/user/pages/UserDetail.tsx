import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useIntl } from '@/utils/intl';

function UserDetail() {
  const navigate = useNavigate();

  const t = useIntl('user');

  return (
    <div>
      UserDetail
      <Button onClick={() => navigate(-1)}>{t('BACK')}</Button>
    </div>
  );
}

export default UserDetail;
