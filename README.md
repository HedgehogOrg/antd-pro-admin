# Admin with Antd Pro and Mobx

   > 由Antd Pro + Mobx 搭建的 Admin

## webpack 配置(注意！！！)
   1. 内含 `output.publicPath` 为 qiankun 而配置，**上线前按需配置**
   2. 使用 `customize-cra` 而不 `eject`
   3. webpack 插件 放到 `./plugins` 内

## mock数据
   本地mock数据在`./mock/mock-data.js`下，非公用需求**不提交**，以免容易发生**冲突**

## 命名规范
| 类型 | 规范 | 例子 |
| --- | --- | --- |
| 文件夹 | kebab-case（小写，中划线） | error-page |
| 页面 / 组件 / 类文件 | PascalCase（大驼峰） | UserList.tsx |
| 普通 js / ts 文件 | kebab-case | request.ts |
| 非公用的样式文件 | kebab-case，带module | login.module.less |
| 图片文件 | 小写，下划线 | icon_logo_200x50.png |
| 样式（用less） class / id | kebab-case | .login-form, #pro-layout |
| js / ts 变量 / 函数 | camelCase（小驼峰） | setToken |
| js / ts 常量 | 全大写 | BASE_URL |


## 目录结构/规范

```
├── src
│   ├── App.tsx                           // 根组件
│   ├── components                        // 公用组件库
│   │   └── PageLayout.tsx                // 登录后的页面布局
│   ├── config                            // 全局业务配置
│   ├── index.tsx                         // 入口文件
│   ├── locales                           // 多语言模块
│   ├── modules                           // 业务模块
│   │   ├── dashboard                     // 模块名称
│   │   │   ├── components                // 模块内组件库
│   │   │   │   ├── ChartsArea.tsx        // 模块内使用的组件
│   │   │   │   └── chart.module.less     // 私有样式需带.module
│   │   │   └── pages                     // 模块下的页面文件夹
│   │   │       └── Dashboard.tsx         // 模块下的页面
│   │   ├── error-page                    // 错误页文件夹
│   │   └── login                         // 登录模块
│   ├── routes
│   │   ├── Index.tsx                     // 路由入口
│   │   ├── MyRouter.tsx                  // 处理路由对象
│   │   └── modules                       // 路由模块
│   ├── stores                            // Mobx数据储存模块
│   └── utils                             // 工具库
```

## 运行脚本

开发\
 [http://localhost:8888](http://localhost:8888)


    npm start

[测试](https://facebook.github.io/create-react-app/docs/running-tests)

    npm test


 打包项目到 `build` 文件夹

    npm run build

