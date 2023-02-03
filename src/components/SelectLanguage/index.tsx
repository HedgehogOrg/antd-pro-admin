import {
  Button,
  Dropdown, MenuProps, Tag,
} from 'antd';
import user from '@/stores/auth/UserStore';
import Lang from '@/locales/index';

function SelectLanguage() {
  const items:MenuProps['items'] = Lang.languages.map((item) => ({
    key: item.value,
    label: (
      <Button
        onClick={() => user.setLanguage(item.value)}
        key={item.value}
        type="link"
      >
        {item.name}
      </Button>
    ),
  }));
  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Tag color="cyan">{Lang.languages.find((lan) => lan.value === user.language)?.name}</Tag>
    </Dropdown>
  );
}

export default SelectLanguage;
