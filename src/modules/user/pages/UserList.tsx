import React from 'react'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Props {

}

const UserList = (props: Props) => {
  const navigate = useNavigate()

  return (
    <div>
      userlist
      <Button onClick={() => navigate('user-detail/1')}>详情1</Button>
      <Button onClick={() => navigate('user-detail/2')}>详情2</Button>
      <Button onClick={() => navigate('user-detail/3')}>详情3</Button>
      <Button onClick={() => navigate('user-detail/4')}>详情4</Button>
      <Button onClick={() => navigate('user-new')}>新建用户</Button>
    </div>
  )
}

export default UserList
