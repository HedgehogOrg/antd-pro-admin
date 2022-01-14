import React from 'react'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Props {

}

const UserDetail = (props: Props) => {
  const navigate = useNavigate()

  return (
    <div>
      UserDetail
      <Button onClick={() => navigate(-1)}>返回</Button>
    </div>
  )
}

export default UserDetail
