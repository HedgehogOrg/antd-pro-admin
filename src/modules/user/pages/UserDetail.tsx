import React from 'react'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setIntlModule } from '../../../utils/utils';

interface Props {

}

const UserDetail = (props: Props) => {
  const navigate = useNavigate()

  const t = setIntlModule('user')

  return (
    <div>
      UserDetail
      <Button onClick={() => navigate(-1)}>{t('BACK')}</Button>
    </div>
  )
}

export default UserDetail
