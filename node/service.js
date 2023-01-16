import express from 'express';
import bodyParser from 'body-parser';
import os from 'os';
const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iFace = interfaces[devName];
    for (let i = 0; i < iFace.length; i++) {
      const alias = iFace[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};
let app = express();
/* 获取公钥 */
app.post('/admin/rsa/get_public_key', function (req, res) {
  res.send({
    code: 0,
    data: {
      public_key: `-----BEGIN PUBLIC KEY-----
      public_key
      -----END PUBLIC KEY-----`,
    },
    msg: '请求成功',
  });
});
/* 中间件，处理请求中的body参数 */
// app.use(bodyParser.urlencoded({ extended: true }));
/* 中间件，处理请求中的request payload参数 */
app.use(bodyParser.json());
/* 登录 */
let loginInfo = { password: '', username: '' };
app.post('/admin/admin/login', function (req, res) {
  loginInfo = { password: req.body.password, username: req.body.username };
  res.send({
    code: 0,
    data: { token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IjRmMXQyM2E4OGJiIn0' },
    msg: '请求成功',
  });
});
/* 获取用户信息 */
app.post('/admin/admin/get_admin_info', function (req, res) {
  res.send({
    code: 0,
    data: {
      admin_info: {
        id: 1,
        avatar:
          'https://ts1.cn.mm.bing.net/th?id=OIP-C.3xZKPhJHn9NxDTaVJ5iIKgHaHa&w=170&h=169&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
        real_name: loginInfo.username,
        username: loginInfo.username,
      },
    },
    msg: '请求成功',
  });
});
/* 获取权限 */
/** 
 {
  id:"id",
  pid:"父的id",
  name:"名称",
  mark:"路径path或者标识",
  icon:"图标",
  type:"类型"; // 1: 菜单 2:按钮 3: 子路由
  sort:"排序"
 }
 */
app.post('/admin/admin/get_permissions_navigate_list', function (req, res) {
  let list = [
    {
      id: 1,
      pid: 0,
      name: '菜单1',
      mark: 'pressRelease',
      icon: 'https://s1.aigei.com/src/img/png/b8/b896f1f74a854c6f89f9002c80535f46.png?imageMogr2/auto-orient/thumbnail/!14x14r/gravity/Center/crop/14x14/quality/85/&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:wDu9NKc-tJ2RHjUTs8X1FVsbgmc=',
      type: 1,
      sort: 2,
    },
    {
      id: 2,
      pid: 1,
      name: '项目管理',
      mark: '/pressRelease/policyDocument',
      icon: '',
      type: 1,
      sort: 0,
    },
    {
      id: 44,
      pid: 2,
      name: '新增',
      mark: '/pressRelease/policyDocument/add',
      icon: '',
      type: 3,
      sort: 5,
    },
    {
      id: 42,
      pid: 2,
      name: '新增按钮',
      mark: 'new',
      icon: '',
      type: 2,
      sort: 5,
    },
    {
      id: 40,
      pid: 2,
      name: '编辑按钮',
      mark: 'edit',
      icon: '',
      type: 2,
      sort: 0,
    },
    {
      id: 41,
      pid: 2,
      name: '删除按钮',
      mark: 'remove',
      icon: '',
      type: 2,
      sort: 0,
    },

    {
      id: 3,
      pid: 1,
      name: '公共组件介绍',
      mark: '/pressRelease/attractInvestment',
      icon: '',
      type: 1,
      sort: 0,
    },
    {
      id: 4,
      pid: 1,
      name: '菜单1-B',
      mark: '/pressRelease/understandPaper',
      icon: '',
      type: 1,
      sort: 0,
    },
    {
      id: 5,
      pid: 0,
      name: '菜单2',
      mark: 'application',
      icon: 'https://s1.aigei.com/src/img/png/ef/ef7afb7598024492b39765a7c6b7024b.png?imageMogr2/auto-orient/thumbnail/!14x14r/gravity/Center/crop/14x14/quality/85/&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:F97WBDDQsy6EJudG8Q2FrXH38mc=',
      type: 1,
      sort: 3,
    },
    {
      id: 6,
      pid: 5,
      name: '菜单2-A',
      mark: '/application/projectDeclare',
      icon: '',
      type: 1,
      sort: 1,
    },
    {
      id: 8,
      pid: 5,
      name: '菜单2-B',
      mark: '/application/ImplementMana',
      icon: '',
      type: 1,
      sort: 2,
    },
    {
      id: 12,
      pid: 0,
      name: '首页',
      mark: '/',
      icon: 'https://s1.chu0.com/src/img/png/d3/d3325692111d4a09a6daacaeafdf9c24.png?imageMogr2/auto-orient/thumbnail/!14x14r/gravity/Center/crop/14x14/quality/85/&e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:PNSvwhv9I-b6lu6TNDsz5NEKDuM=',
      type: 1,
      sort: 1,
    },
  ];
  let adminList = [
    {
      id: 11,
      pid: 0,
      name: '系统管理',
      mark: '/system',
      icon: 'https://s1.aigei.com/src/img/png/c0/c0c3ae49118d45998d9e512d9c571b78.png?imageMogr2/auto-orient/thumbnail/!14x14r/gravity/Center/crop/14x14/quality/85/&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:cZmiO-jM7P1UkdpBWAZd8ZRqyyU=',
      type: 1,
      sort: 9,
    },
    {
      id: 14,
      pid: 11,
      name: '导航管理',
      mark: '/system/navs',
      icon: '',
      type: 1,
      sort: 1,
    },
    {
      id: 15,
      pid: 11,
      name: '角色管理',
      mark: '/system/roles',
      icon: '',
      type: 1,
      sort: 2,
    },
  ];
  if (loginInfo.username === 'admin') {
    list = list.concat(adminList);
  }
  res.send({
    code: 0,
    data: {
      navigate_list: list,
    },
    msg: '请求成功',
  });
});
/* 登出 */
app.post('/admin/admin/logout', function (req, res) {
  res.send({
    code: 0,
    data: [],
    msg: '请求成功',
  });
});
let server = app.listen(8888, function () {
  console.log(` 接口已启动:\n`, `http://localhost:${8888}\n`, `http://${getIPAddress()}:${8888}\n`);
});
