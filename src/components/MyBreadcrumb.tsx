import { Breadcrumb } from 'antd'
import { MenuDataItem } from '@ant-design/pro-layout';
import MyRouter from '../routes/MyRouter';

interface Props {
  routes: MenuDataItem[],
  pathname: string
}

// 匹配面包屑
const MyBreadcrumb = (props: Props) => {
  const getTextFromBreadcrumbObj = () => {
    const path = props.pathname.slice(1)
    let bread: string[] = []
    Object.entries(MyRouter.breadcrumbObj).forEach(([key, value]) => {
      const regStr = '^' + key.replace(/\/:\w+[^/]/g, '/\\w*[^/]') + '$'
      const reg = new RegExp(regStr)
      if (path.match(reg)) {
        bread = value.split('/')
      }
    })
    return bread
  }

  return (
    <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
      <Breadcrumb>
        {
          getTextFromBreadcrumbObj().map(item =>
            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            // <a href="">Application Center</a>
          )
        }
    </Breadcrumb>
    </div>
  )
}

export default MyBreadcrumb
