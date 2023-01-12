import { Breadcrumb } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Route as RouteType } from '@ant-design/pro-layout/lib/typings';
import MyRouter from '@/routes/router';
import { MyBreadcrumbType } from '@/types/routes';

// 匹配面包屑
function MyBreadcrumb(props: MyBreadcrumbType) {
  const { pathname } = props;
  let bread: RouteType[] = [];
  let fullPath = '';
  const params = useParams();
  Object.entries(MyRouter.breadcrumbObj).forEach(([key, parents]) => {
    // 匹配 /:id 的情况
    const regStr = `^${key.replace(/\/:\w+[^/]/g, '/\\w*[^/]')}$`;
    const reg = new RegExp(regStr);
    if (pathname.match(reg)) {
      bread = parents;
    }
  });

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Breadcrumb>
        {
          bread.map((route: RouteType, index) => {
            if (route.path) {
              // 替换/:id之类的参数，多个参数时参数名不可以一样
              const path = route.path.replace(/:\w+[^/]/g, (str) => params[str.slice(1)] || '');
              fullPath += `/${path}`.replace('//', '/');
            }
            return (
              <Breadcrumb.Item key={route.name}>
                {route.path && index < bread.length - 1 ? <Link to={fullPath}>{route.name}</Link> : route.name}
              </Breadcrumb.Item>
            );
          })
        }
      </Breadcrumb>
    </div>
  );
}

export default MyBreadcrumb;
