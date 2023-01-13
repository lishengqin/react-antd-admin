import type { MenuProps } from 'antd';
import { getPremissionList } from "@/service/login"
/* @ts-ignore */
import { sortBy } from "lodash"
import { BreadcrumItemType, MenuItemType } from "@/const/menu"
import { atom, selector } from 'recoil';
/* 展开收起 */
export const collapsedAtom = atom({
  key: "app.global.collapsed",
  default: false
})

/* 菜单权限 */
function dealMenus(list: MenuItemType[]): MenuItemType[] {
  list = sortBy(list, ["sort"])
  let newList: MenuItemType[] = []
  // 给每个数据加children属性
  list.forEach(one => {
    one.children = []
  })
  list.forEach(one => {
    let findIndex = list.findIndex(item => {
      return item.id === one.pid
    })
    if ((!one.pid && one.pid !== 0) || findIndex === -1) {
      newList.push(one)
    } else {
      list[findIndex].children.push(one)
    }
  })
  return newList
}
export const menuSelector = selector({
  key: "app.global.menu",
  get: async () => {
    let premissionList: any = await getPremissionList();
    let newPremissionList = dealMenus(premissionList.navigate_list)
    return newPremissionList
  }
})
/* 面包屑 */
let _breadcrumbAtom: { key: string, default: BreadcrumItemType[] } = {
  key: "app.global.breadcrumb",
  default: []
}
export const breadcrumbAtom = atom(_breadcrumbAtom)
