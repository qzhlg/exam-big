##考试管理后台
##启动项目
-初始化
```js
create-react-app exam-cms --scripts-version=react-scripts-ts
```
-启服务
```js
yarn start||npm run start
```
##环境搭建
```js
  npm install --save-dev @babel/plugin-proposal-decorators
```
-引入路由
-引入mobox
-引入antd
##配置别名
-tsconfig.json
```js
  "compilerOptions":{
      "baseUrl": "src",
    "paths": {
      "@/*":[
        "./*"
      ]
    },
  }
```

