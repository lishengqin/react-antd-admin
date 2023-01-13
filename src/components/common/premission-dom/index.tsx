/* 控制权限的组件 */
import { menuSelector } from "@/store/menu";
import { useRecoilValue } from "recoil"
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { menuType } from "@/const/menu"
import { MenuItemType } from "@/const/menu"
type PropsType = {
  children: any,
  p: string,/* 按钮编码 */
  [p: string]: any
}
function PremissionDom(props: PropsType) {
  const menuPremission: MenuItemType[] = useRecoilValue(menuSelector);
  const location = useLocation();
  const findMenuByMark = (list: MenuItemType[]): object | undefined => {
    let path = location.pathname
    for (let i in list) {
      if (list[i].mark === path) {
        return list[i]
      }
      if (list[i].children && list[i].children.length) {
        let find = findMenuByMark(list[i].children);
        if (find) {
          return find;
        }
      }
    }
  }
  const isPremission = useMemo(() => {
    let menu: MenuItemType | {} = findMenuByMark(menuPremission) || {};
    /* @ts-ignore */
    let btnPList = (menu.children || []).filter((one: MenuItemType) => menuType[one.type] === "btn").map(one => one.mark)
    return btnPList.includes(props.p)
  }, [location])

  return <>{isPremission ? props.children : null}</>
}
export default PremissionDom