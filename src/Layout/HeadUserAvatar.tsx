import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { adminLogout } from "@/service/login"
import { LogoutClear } from "@/utils/LogoutClear"
import { useNavigate } from "react-router-dom"
import style from "./style/HeadUserAvatar.module.scss"
function UserAvatar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "");
  const items = [
    { label: "修改密码", key: "changePassword" },
    {
      label: "退出登录", key: "logOut", onClick: () => {
        adminLogout().then(res => {
          LogoutClear();
          navigate("/login")
        })
      }
    }
  ]
  return (
    <Dropdown menu={{ items }} trigger={['click']} overlayClassName="user-avatar-dropdown">
      <div className={style["user-avatar-dropdown-trigger"]}>
        <img src={userInfo.avatar} alt="" />
        <span className={style['real_name']}>{userInfo.real_name}</span>
        <CaretDownOutlined />
      </div>
    </Dropdown >
  )
}
export default UserAvatar