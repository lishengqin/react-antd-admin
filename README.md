### react 项目框架

react+antd+ts，搭建的一个 react 项目的框架，包含 layout、登录、菜单按钮路由权限。

首先进入登录页面，输入账号密码后，调用登录接口，登录成功后，将 `loginToken`存储在 localStorage，然后获取用户信息接口，将 `userInfo`存储在 localStorage，最后调用权限接口获取权限，权限包括菜单、子路由和按钮。以上的接口，本项目都是用`node express` 自己写的接口。

目录结构：

```
| /node - node express接口
| /src
|- /components 公共组件
|- /const 常量文件
|- /Layout layout框架
|- /pages 业务文件
|- /router 路由
|- /service 接口服务
|- /store 全局变量
|- /utils
|-- /LogoutClear 登出要清空的操作
|- /style 样式
| README.MD 说明文档
```

### 启动

- `npm install` // 初始化
- `npm run service` // 启动本地接口服务,端口 8888
- `npm run dev` // 启动项目，端口 5173
