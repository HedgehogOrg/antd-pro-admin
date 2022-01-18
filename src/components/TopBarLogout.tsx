import { Dropdown, Menu, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import user from '../stores/user'
import { useNavigate } from 'react-router-dom';

interface Props {

}

const TopBarLogout = (props: Props) => {
  const navigate = useNavigate()
  const logout = () => {
    user.logout().then(() => {
      navigate('/login')
    })
  }
  const menu = <Menu>
    <Menu.Item onClick={logout} key={user.user.username}>
      {user.user.username} 退出
    </Menu.Item>
  </Menu>

  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow>
      <div>
        <Avatar shape="square" size="small" icon={<UserOutlined />} />
      </div>
    </Dropdown>
  )
}

export default TopBarLogout
