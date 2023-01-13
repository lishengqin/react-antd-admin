import './lazy-loading-screen.scss';
import { Spin } from 'antd';

// TODO: placeholder
export default function LazyLoadingScreen({ text }: { text?: string }) {
  return (
    <div id="loading-wrapper">
      <Spin tip={text}>
        <div style={{ height: '50px', width: '50px' }} />
      </Spin>
    </div>
  );
}
