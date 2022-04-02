import React from 'react';
import { Button, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import intl from 'react-intl-universal';
import Dayjs from 'dayjs';
import user from '@/stores/user';

function UserList() {
  const navigate = useNavigate();

  return (
    <div>
      userlist
      <br />
      {user.language}
      <br />
      <Button onClick={() => navigate('user-detail/1')}>{intl.get('user.DETAIL', { id: 1 })}</Button>
      <Button onClick={() => navigate('user-detail/2')}>{intl.get('user.DETAIL', { id: 2 })}</Button>
      <Button onClick={() => navigate('user-detail/3')}>{intl.get('user.DETAIL', { id: 3 })}</Button>
      <Button onClick={() => navigate('user-detail/4')}>{intl.get('user.DETAIL', { id: 4 })}</Button>
      <Button onClick={() => navigate('user-new')}>{intl.get('user.NEW_USER')}</Button>
      <DatePicker />
      {intl.get('user.TIME', { time: Dayjs() })}
    </div>
  );
}

export default UserList;
