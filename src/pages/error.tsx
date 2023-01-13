import {Result} from 'antd';

export default function ErrorPage({error}: {error?: Error}) {
  return (
    // <div style={{width: '100%', display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
    //     <img style={{objectFit: 'cover', width: '80%'}}
    //          src="https://wsnf.oss-cn-hangzhou.aliyuncs.com/sjxt/test/26/9ac54584-1be5-4edd-8463-97caaa9a421f/5221808.jpg"/>
    //     <a href="http://www.freepik.com">Designed by stories / Freepik</a>
    // </div>
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Result status="500" title="500" style={{background: 'white'}} subTitle="页面发生了错误" />
    </div>
  );
}
