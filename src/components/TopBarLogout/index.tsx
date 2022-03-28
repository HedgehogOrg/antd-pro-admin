import { Dropdown, Menu, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import user from '../../stores/user'
import { useNavigate } from 'react-router-dom';
import SelectLanguage from '../SelectLanguage';
import intl from 'react-intl-universal';

const TopBarLogout = () => {
  const navigate = useNavigate()
  const logout = () => {
    user.logout().then(() => {
      navigate('/login')
    })
  }
  const menu = <Menu>
    <Menu.Item onClick={logout} key={user.user.username}>
      {user.user.username} {intl.get('login.LOGOUT')}
    </Menu.Item>
  </Menu>

  return (
    <div>
      <SelectLanguage></SelectLanguage>
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Avatar shape="square" size="small" icon={<UserOutlined />} />
      </Dropdown>
    </div>
  )
}

export default TopBarLogout
