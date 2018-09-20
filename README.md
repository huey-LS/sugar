# Sugar
对前后端同构的尝试。本项目使用了 `React` 作为通用的 `view`

## 目录介绍
- `src`
  - `src/configs` 所有配置的存在文件夹
  - `src/core` http服务的核心代码
  - `src/routes` 路由文件夹
  - `src/view` view文件夹
    - `src/view/applications` 存放每个应用的文件夹
- `static` 静态资源目录
- `bootstrap` 启动及构建的脚本

### Config (@app/core/config)
#### 添加方法
在 `src/configs/index.js` 中引入并导出，可参考 `server.json`, 保证导出为 `json` 格式数据即可。

#### 使用方法
config 就创建为单例。 添加的数据会被扁平化。
```js
import config from '@app/core/config';
config.get('server.name');
// return: "sugar"
```

#### server 配置
文件路径：`src/configs/server.json`

已支持的配置预览
```json
{
  "name": "sugar", // http服务名字
  "port": 4000, // 监听的端口号


  "view": {
    "root": "./view", // view的根目录（一般不用修改）
    "application": "./applications" // 启动应用的目录，相对与view.root（一般不用修改）
  },

  "static": {
    "route": "/static", // 静态资源路由
    "path": "./static" // 静态资源路径
  }
}
```

### Routes (@app/core/router)
目录： `src/routes`

添加一个新的路由
```js
import { GetRoute, PostRoute, PutRoute, DelRoute, AllRoute } from '@app/core/router';

export class Routes {
  @GetRoute('/test')
  static getTest = (ctx, next) => {
    ctx.body = 'get /test'
  }

  @PostRoute('/test')
  static postTest = (ctx, next) => {
    ctx.body = 'post /test'
  }

  @PutRoute('/test')
  static putTest = (ctx, next) => {
    ctx.body = 'put /test'
  }

  @DelRoute('/test')
  static delTest = (ctx, next) => {
    ctx.body = 'delete /test'
  }

  @AllRoute('/test-all')
  static allTest = (ctx, next) => {
    ctx.body = 'all /test-all'
  }
}
// curl -X GET 127.0.0.1:4000/test
// 返回: get /test
// curl -X POST 127.0.0.1:4000/test
// 返回: post /test
// curl -X PUT 127.0.0.1:4000/test
// 返回: put /test
// curl -X DELETE 127.0.0.1:4000/test
// 返回: delete /test
// curl 127.0.0.1:4000/test-al
// 返回: all /test-all
```