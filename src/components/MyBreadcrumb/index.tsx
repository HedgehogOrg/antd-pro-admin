import { Breadcrumb } from 'antd';
import MyRouter from '@/routes/MyRouter';
import { MyBreadcrumbType } from '@/types/routes';

// 匹配面包屑
function MyBreadcrumb(props: MyBreadcrumbType) {
  const getTextFromBreadcrumbObj = () => {
    const { pathname } = props;
    const path = pathname.slice(1);
    let bread: string[] = [];
    Object.entries(MyRouter.breadcrumbObj).forEach(([key, value]) => {
      // 匹配 /:id 的情况
      const regStr = `^${key.replace(/\/:\w+[^/]/g, '/\\w*[^/]')}$`;
      const reg = new RegExp(regStr);
      if (path.match(reg)) {
        bread = value.split('/');
      }
    });
    return bread;
  };

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Breadcrumb>
        {
          getTextFromBreadcrumbObj().map((item) => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
        }
      </Breadcrumb>
    </div>
  );
}

export default MyBreadcrumb;
