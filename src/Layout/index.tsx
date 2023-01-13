import React, { lazy, useMemo } from 'react';
import { Routes, Route, } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import LazyLoadingScreen from '@/components/common/loading-screen/lazy-loading-screen';
import ErrorBoundary from '@/components/common/error-boundary/error-boundary';
import { collapsedAtom, menuSelector } from "@/store/menu"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;
import style from "./style/index.module.scss"
import { routes } from "@/router/navs"
import { menuType, MenuItemType } from "@/const/menu"
import LeftMenu from "./LeftMenu"
import HeadBreadcrumb from "./HeadBreadcrumb"
import HeadUserAvatar from "./HeadUserAvatar"
const NotFound = lazy(() => import('@/pages/404'));
function LayoutComponent() {
  /* 收缩折叠 */
  const [collapsed, setCollapsed] = useRecoilState(collapsedAtom)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  /* 路由过滤 */
  const menuItems: MenuItemType[] = useRecoilValue(menuSelector);
  const dealListDeepFn = (list: MenuItemType[]) => {
    let oneLevelList: MenuItemType[] = [];
    list.forEach(one => {
      oneLevelList.push({ ...one, children: [] });
      if (one.children && one.children.length) {
        oneLevelList = oneLevelList.concat(dealListDeepFn(one.children))
      }
    })
    return oneLevelList
  }
  const premissionRoutes = useMemo(() => {
    let _routes: any = [];
    let premissionList = dealListDeepFn(menuItems);
    routes.forEach(route => {
      if (route.meta && route.meta.isWhite) {
        _routes.push(route)
      } else {
        let find = premissionList.find(one => one.mark === route.path);
        if (find) {
          let children = premissionList.filter((one: MenuItemType) => find && one.pid === find.id && menuType[one.type] !== 'btn') || [];
          let isFolderMenu = children.some(one => menuType[one.type] === 'menu');// 是否为菜单目录，并不是真正的菜单或者路由
          if (!isFolderMenu) {
            _routes.push(route)
          }
        }
      }
    })
    return _routes;
  }, [menuItems])
  return (<Layout style={{ height: '100%' }} className={style['ant-layout']}>
    <Sider trigger={null} collapsible collapsed={collapsed} width={230} className={[style['ant-layout-sider'], 'left-menu-sider'].join(" ")}>
      <div className={style.mainName}>{!collapsed ? 'react项目框架' : '项目'}</div>
      <LeftMenu />
    </Sider>
    <Layout className="site-layout right-layout-wrap">
      <React.Suspense fallback={<LazyLoadingScreen />}>
        <Header className={style['header']}>
          <div className={style['head-left']}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: style['trigger'],
              onClick: toggleCollapsed,
            })}
            <HeadBreadcrumb />
          </div>
          <HeadUserAvatar />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: "#fff",
            overflow: "auto"
          }}
        >
          <ErrorBoundary>
            <Routes>
              {premissionRoutes.map((item: any) => (
                <Route key={item.path} path={item.path} element={React.createElement(item.component)} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </Content>
      </React.Suspense>
    </Layout>
  </Layout >)
}
export default LayoutComponent