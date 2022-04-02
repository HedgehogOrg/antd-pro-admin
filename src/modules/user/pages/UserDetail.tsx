import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setIntlModule } from '@/utils/utils';

function UserDetail() {
  const navigate = useNavigate();

  const t = setIntlModule('user');

  return (
    <div>
      UserDetail
      <Button onClick={() => navigate(-1)}>{t('BACK')}</Button>
    </div>
  );
}

export default UserDetail;
