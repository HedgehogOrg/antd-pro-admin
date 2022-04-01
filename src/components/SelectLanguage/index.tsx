import { Dropdown, Menu, Tag } from 'antd';
import user from '@/stores/user';
import Lang from '@/locales/index';

type Props = {};

const SelectLanguage = (props: Props) => {
  const LanguageList = <Menu selectedKeys={[user.language]}>
   {
     Lang.languages.map((item) => (
       <Menu.Item key={item.value} onClick={() => user.setLanguage(item.value)}>{ item.name }</Menu.Item>
     ))
   }
 </Menu>

  return <Dropdown overlay={LanguageList} placement='bottomRight'>
    <Tag color="cyan">{Lang.languages.find(lan => lan.value === user.language)?.name}</Tag>
  </Dropdown>;
};

export default SelectLanguage;
