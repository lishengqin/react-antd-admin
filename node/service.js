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
  res.send({
    code: 0,
    data: {
      navigate_list: [
        {
          id: 1,
          pid: 0,
          name: '菜单1',
          mark: 'pressRelease',
          icon: 'https://img.hzanchu.com/acimg/0072b19324dca19b57f8244a40c4f456.png',
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
          name: '菜单1-A',
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
          icon: 'https://img.hzanchu.com/acimg/ad6a8705e4519ad7960755e123835c37.png',
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
          id: 11,
          pid: 0,
          name: '系统管理',
          mark: '/system',
          icon: 'https://img.hzanchu.com/acimg/44ee0ec7b087afda4a3e6502c38f6fc2.png',
          type: 1,
          sort: 9,
        },
        {
          id: 12,
          pid: 0,
          name: '首页',
          mark: '/',
          icon: 'https://img.hzanchu.com/acimg/fb6df2d74e80d1b25d84c815ced6b3bb.png',
          type: 1,
          sort: 1,
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
      ],
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
