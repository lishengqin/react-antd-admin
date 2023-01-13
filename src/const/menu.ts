export const menuType = {
  1: "menu",// 菜单
  2: "btn",// 按钮
  3: "childRoute"// 子路由
}
export type BreadcrumItemType = {
  name: string,/* 名称 */
  mark: string,/* path路径 */
  isLink: Boolean/* 是否可以点击跳转 */
}
export type MenuItemType = {
  icon: string,
  pid: number,
  id: number,
  mark: string,
  name: string,
  type: 1 | 2 | 3,
  children: MenuItemType[],
  [p: string]: any
}