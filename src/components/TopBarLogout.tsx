import { Dropdown, Menu, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import user from '../stores/user'
import { useNavigate } from 'react-router-dom';
import SelectLanguage from './SelectLanguage';

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
    <div>
      <SelectLanguage></SelectLanguage>
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Avatar shape="square" size="small" icon={<UserOutlined />} />
      </Dropdown>
    </div>
  )
}

export default TopBarLogout
