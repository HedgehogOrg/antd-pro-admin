# Admin with Antd Pro and Mobx

   > 由Antd Pro + Mobx 搭建的 Admin

## webpack 配置(注意！！！)
   1. 内含 `output.publicPath` 为 qiankun 而配置，**上线前按需配置**
   2. 使用 `customize-cra` 而不 `eject`
   3. webpack 插件 放到 `./plugins` 内

## mock数据
   本地mock数据在`./mock/mock-data.js`下，非公用需求**不提交**，以免容易发生**冲突**

## 运行脚本

开发\
 [http://localhost:8888](http://localhost:8888)


    npm start

[测试](https://facebook.github.io/create-react-app/docs/running-tests)

    npm test


 打包项目到 `build` 文件夹

    npm run build

