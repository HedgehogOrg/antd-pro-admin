import React, { ReactElement } from 'react'
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';


export default function Page404(): ReactElement {
  const navigate = useNavigate()

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="对不起，您浏览的网页不存在。"
        extra={<Button type="primary" onClick={() => navigate('/')}>返回主页</Button>}
      />
      <Button type="primary" onClick={() => navigate('/dashboard')}>dashboard</Button>
    </div>
  )
}
