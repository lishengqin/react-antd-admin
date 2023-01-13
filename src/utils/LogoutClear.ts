export function LogoutClear() {
  localStorage.removeItem('loginToken')
  localStorage.removeItem('userInfo')
}