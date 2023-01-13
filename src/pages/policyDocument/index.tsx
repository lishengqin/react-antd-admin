import { Button } from 'antd';
import PremissionDom from "@/components/common/premission-dom/index"
import { useNavigate } from "react-router-dom"
function PolicyDocument() {
  const navigate = useNavigate(); // 路由跳转
  const add = () => {
    navigate("/pressRelease/policyDocument/add")
  }
  return (
    <div>
      <div className='mt-16'>项目管理-按钮权限控制</div>
      <div className='mt-16'>
        【调整关联按钮】没权限，不展示：
        <PremissionDom p="adjust">
          <Button type="primary" size="middle">
            调整关联
          </Button>
        </PremissionDom>
      </div>
      <div className='mt-16'>
        【新增关联按钮】有权限，展示，点击按钮，进入新增页面：
        <PremissionDom p="new">
          <Button type="primary" size="middle" onClick={add}>
            新增
          </Button>
        </PremissionDom>
      </div>
      <div className='mt-16'>
        【删除关联按钮】有权限，展示：
        <PremissionDom p="remove">
          <Button type="primary" size="middle">
            删除
          </Button>
        </PremissionDom>
      </div>

    </div >
  )
}
export default PolicyDocument