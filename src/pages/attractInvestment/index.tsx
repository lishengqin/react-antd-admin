
import LazyLoadingScreen from '@/components/common/loading-screen/lazy-loading-screen';
import { NoData, NoAccess, NotFound } from "@/components/common/feedback"
function Feedbacks() {
  return (<div>
    提供的公共组件有：
    <ul>
      <li>LazyLoadingScreen:加载组件</li>
      <li>NoData:暂无内容</li>
      <li>NoAccess:暂无权限</li>
      <li>NotFound:页面不存在</li>
      <li>PremissionDom:元素权限</li>
    </ul>
    <div style={{ height: "200px", position: "relative" }}>
      <LazyLoadingScreen text="加载中..." />
    </div>
    <NoData />
    <NoAccess />
    <NotFound />
  </div>)
}
export default Feedbacks