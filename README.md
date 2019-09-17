## 考试管理平台
##  启动项目
- 初始化
```js
create-react-app exam-cms --scripts-version=react-scripts-ts
```
- 启服务
```js
yarn start||npm run start
```
## 环境搭建
```js
  npm install --save-dev @babel/plugin-proposal-decorators
```
- 引入路由
- 引入mobox
- 引入antd


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
   // 声明let 变量
    "prefer-const": false,
    // 可以声明带有下划线的变量
      "variable-name": false
  },
  `js
    获取参数
  
  `
```
## 导入导出
```
npm i xlst -D
```
## 发布上线
sourceMap
作用
```
把线上代码和本地源文件做映射，报错时直接显示源文件中代码的位置
```
使用
```
//# sourceMappingURL=0.c58a1879.chunk.js.map
```
###antd按需加载
##### Babel中使用
```
npm i -D babel-plugin-import
// 配置.babelrc
"plugins": [
    ["import", {
        "libraryName": "antd",
        "style": "css"
    }]
],
```
##### [ts中使用](https://github.com/ant-design/babel-plugin-import/issues/73)
#### node_modules中非业务逻辑包的抽离
```
npm i -D ui-component-loader
// 在webpack中添加loader
{
    test: /\.(ts|tsx)$/,
    include: paths.appSrc,
    use: [
        {
        loader: require.resolve('ts-loader'),
        options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true,
            configFile: paths.appTsProdConfig,
        },
        },
        {
        loader: 'ui-component-loader',
        options: {
            'lib': 'antd',
            'camel2': '-',
            'style': 'style/css.js',
        }
        }
    ],
}
```
在webpack3中使用[commonChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/#root)
```
 new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
    // This prevents stylesheet resources with the .css or .scss extension
    // from being moved from their original chunk to the vendor chunk
    if(module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
        return false;
    }
    return module.context && module.context.includes('node_modules');
    }
})
```
在webpack4中配置splitChunks
```
optimization: {
 splitChunks: {
        cacheGroups: {
            vendor: {   // 抽离第三方插件
                test: /node_modules/,   // 指定是node_modules下的第三方包
                chunks: 'initial',
                name: 'vendor',  // 打包后的文件名，任意命名    
                // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                priority: 10    
            },
            utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
                chunks: 'initial',
                name: 'utils',  // 任意命名
                minChunks: 2,   // 引用次数最少两次
                minSize: 0    // 只要超出0字节就生成一个新包
            }
        }
    }
}
```
### 发布策略
- 长时间强缓存
- 内容摘要命名文件
- 增量发布
