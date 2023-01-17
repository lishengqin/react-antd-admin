// 公钥--获取公钥
import request from "./request"
/* 获取公钥 */
export function rsaGetPublicKey(data: Object | undefined) {
  return request.post('/rsa/get_public_key', data);
}
/* 登录 */
export function adminLogin(data?: any) {
  return request.post('/admin/login', data);
}
/* 登出 */
export function adminLogout() {
  return request.post('/admin/logout', {});
}
/* 用户信息 */
export function getAdminInfo(data?: any) {
  return request.post('/admin/get_admin_info', data);
}
/* 获取权限 */
export function getPremissionList() {
  let userInfo = localStorage.getItem("userInfo") || "{}";
  let username = JSON.parse(userInfo).username
  return request.post('/admin/get_permissions_navigate_list', { username });

}
