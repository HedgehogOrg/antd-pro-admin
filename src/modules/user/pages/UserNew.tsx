import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function UserNew() {
  const navigate = useNavigate();

  return (
    <div>
      UserNew
      <Button onClick={() => navigate(-1)}>返回</Button>
    </div>
  );
}

export default UserNew;
