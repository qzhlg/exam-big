## 考试管理平台
##  启动项目
-初始化
```js
create-react-app exam-cms --scripts-version=react-scripts-ts
```
-启服务
```js
yarn start||npm run start
```
## 环境搭建
```js
  npm install --save-dev @babel/plugin-proposal-decorators
```
-引入路由
-引入mobox
-引入antd


## 配置别名
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
### 路由
```js
yarn add react-router-dom -D
```
### mobx
```js
yarn add mobx -D
yarn add mobx-react -D
```
```js
import {observable,action} from 'mobx'
import {Provider} from 'mobx-react'
```
tslint.json一些配置
可以使用console.log 不按字母新后顺序设为false 等等
```js

用于测试提交发货苏苏闪电发货

"rules": {
    "interface-name" : [true, "never-prefix"],
    "no-console": [
      false
    ],
    "only-arrow-functions": [
      false
    ],
    //不按字母大小写排序
    "object-literal-sort-keys":false,
    "member-assess":false,
    "ordered-imports":[
      false,
      {
        "import-sources-order":"lowercase-last",
        "named-imports-order":"lowercase-first"
      }
    ],
    //搭配js时不按字母大小写排序
     "jsRules": {
    "object-literal-sort-keys": false
    },
    //注释前不需要空格
     "comment-format": [
      true,
      "check-space"
    ],
    //防止初心jsx的报错
   "jsx-no-lambda": false
  },
  
```
```js
详情页的数据，
明天开始写添加用户的接口,
添加考试的接口
```
