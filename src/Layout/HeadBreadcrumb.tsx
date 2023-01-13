import { useEffect, } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { menuSelector, breadcrumbAtom, } from "@/store/menu"
import { menuType } from "@/const/menu"
import { Breadcrumb } from 'antd';
import { BreadcrumItemType, MenuItemType } from "@/const/menu"

function HeadBreadcrumb() {
  /* 面包屑 */
  const menuItems: MenuItemType[] = useRecoilValue(menuSelector);
  const [breadcrumbArray, setBreadcrumbArray] = useRecoilState(breadcrumbAtom)
  const location = useLocation();
  useEffect(() => {
    let newBreadcrumbArray: BreadcrumItemType[] = getParentsById(menuItems, location.pathname) || [];
    newBreadcrumbArray.reverse()
    setBreadcrumbArray(newBreadcrumbArray)
  }, [location]);
  function getParentsById(list: MenuItemType[], pathname: string): BreadcrumItemType[] | undefined {
    const dealBreadcrumbItem = (item: MenuItemType) => {
      /* @ts-ignore */
      const isLink = !((item.children || []).filter((one: MenuItemType) => menuType[one.type] === 'menu').length)
      let breadcrumbItem: BreadcrumItemType = {
        name: item.name,
        mark: item.mark,
        isLink: isLink
      }
      return breadcrumbItem
    }
    for (let i in list) {
      if (list[i].mark === pathname) {
        return [dealBreadcrumbItem(list[i])]
      }
      if (list[i].children && list[i].children.length) {
        let node = getParentsById(list[i].children, pathname);
        if (node) {
          return node.concat(dealBreadcrumbItem(list[i]))
        }
      }
    }
  }
  const navigate = useNavigate(); // 路由跳转
  const pageLink = (breadcrumb: BreadcrumItemType, index: Number) => {

    if (breadcrumb.isLink && location.pathname !== breadcrumb.mark) {
      navigate(breadcrumb.mark)
    }
  }
  return (<Breadcrumb>
    {breadcrumbArray.map((one: BreadcrumItemType, index) => {
      return (<Breadcrumb.Item key={index} className={one.isLink ? 'pointer' : ''} onClick={() => pageLink(one, index)}>{one.name} </Breadcrumb.Item>)
    })}
  </Breadcrumb>)
}
export default HeadBreadcrumb