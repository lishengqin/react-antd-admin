import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { collapsedAtom, menuSelector } from "@/store/menu"
import { Menu } from 'antd';
const { SubMenu } = Menu;
import style from "./style/LeftMenu.module.scss"
import { menuType, MenuItemType } from "@/const/menu"
function LeftMenu() {


  /* 菜单 */
  const location = useLocation();
  const collapsed = useRecoilValue(collapsedAtom);
  const menuItems: MenuItemType[] = useRecoilValue(menuSelector);
  const sideNav = useMemo(() => {
    const renderItem = (item: MenuItemType) => {
      /* @ts-ignore */
      if (menuType[item.type] !== 'menu') {
        return
      }
      /* @ts-ignore */
      let children = (item.children || []).filter((one: MenuItemType) => menuType[one.type] === 'menu')
      if (children.length) {
        const navs = children || [];
        if (navs.length > 0) {
          return (
            < SubMenu
              key={item.mark}
              title={
                <>
                  {
                    item.icon && (
                      <img className={[style.icons, 'icons'].join(" ")} src={item.icon} />
                    )
                  }
                  <span>{item.name}</span>
                </>
              }
            >
              {navs.map((child: MenuItemType) => renderItem(child))}
            </SubMenu >
          );
        }
      }
      return (
        <Menu.Item key={item.mark}>
          <NavLink to={item.mark}>
            {item.icon && <img className={[style.icons, 'icons'].join(" ")} src={item.icon} />}
            <span>{item.name}</span>
          </NavLink>
        </Menu.Item>
      );
    };
    return menuItems.map((child: MenuItemType) => renderItem(child));
  }, [menuItems, collapsed]);
  return (<Menu
    mode="inline"
    theme='dark'
    selectedKeys={[location.pathname]}
  >
    {sideNav}
  </Menu>)
}
export default LeftMenu