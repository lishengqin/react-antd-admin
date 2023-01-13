import styles from "./index.module.scss"
import { Radio, Input, message } from 'antd';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { rsaGetPublicKey, adminLogin, getAdminInfo } from "@/service/login"
import JSEncrypt from 'jsencrypt' // rsa加密
import loginPerson from "@/assets/loginPerson.png"
import loginPassword from "@/assets/loginPassword.png"
function LoginPage() {
  const [radioValue, setRadioValue] = useState(1);
  const onRadioChange = (e: any) => {
    setRadioValue(e.target.value);
  };
  /* 账号 */
  const [account, setAccount] = useState('');
  const secondAccountChange = (e: any) => {
    setAccount(e.target.value.trim());
  };
  /* 密码 */
  const [secondPass, setSecondPass] = useState('');
  const secondPassChange = (e: any) => {
    setSecondPass(e.target.value.trim());
  };
  /* 登录 */
  const [publicKey, setPublicKey] = useState(""); // 当前的rsa加密公钥
  const getKey = () => {
    rsaGetPublicKey({}).then((res: any) => {
      setPublicKey(res.public_key)
    })
  }
  useEffect(() => {
    getKey()
  }, [])
  const [normalLoginAble, setNormalLoginAble] = useState(false);
  const navigate = useNavigate(); // 路由跳转
  const normalLoginAction = async () => {
    if (secondPass && account) {
      var encryptor = new JSEncrypt()  // 创建加密对象实例
      encryptor.setPublicKey(publicKey)//设置公钥
      var rsaPassWord = encryptor.encrypt(secondPass)  // 对内容进行加密
      let data = {
        username: account,
        password: rsaPassWord,
      };
      if (normalLoginAble) {
        return
      }
      setNormalLoginAble(true);
      try {
        const tokenRes: any = await adminLogin(data);
        localStorage.setItem('loginToken', tokenRes.token);
        const userInfo: any = await getAdminInfo({})
        localStorage.setItem('userInfo', JSON.stringify(userInfo.admin_info));
        navigate("/")
      } catch (e) {
        console.error(e, "登录失败")
      } finally {
        setNormalLoginAble(false);
      }
    } else {
      message.error('请检查输入项');
    }
  }
  return (<div className={styles.masterPageCon}>
    <div className={styles.centerCon} >
      <div className={styles.leftPart}>
        <div className={styles.hrLine}></div>
        <div className={styles.welcome}>欢迎登录</div>
        <div className={styles.name}>react项目框架</div>
      </div>
      <div className={styles.rightPart}>
        <Radio.Group
          className={styles.radioGroup}
          onChange={onRadioChange}
          value={radioValue}
        >
          <Radio value={1}>帐号登录</Radio>
          <Radio value={2} disabled={true}>
            扫码登录
          </Radio>
        </Radio.Group>

        <div className={styles.formCon}>
          <div className={styles.formitem}>
            <img
              className={styles.account}
              src={loginPerson}
            />
            <Input
              size="large"
              className={styles.formiteminput}
              placeholder="请输入账号"
              allowClear
              bordered={false}
              maxLength={25}
              value={account}
              onChange={(e) => {
                secondAccountChange(e);
              }}
            />
          </div>
          <div className={styles.formitem}>
            <img
              className={styles.account}
              src={loginPassword}
            />
            <Input
              size="large"
              className={styles.formiteminput}
              placeholder="请输入密码"
              allowClear
              type="password"
              bordered={false}
              maxLength={25}
              value={secondPass}
              onChange={(e) => {
                secondPassChange(e);
              }}
            />
          </div>
          <button
            className={styles.loginBtn}
            disabled={normalLoginAble}
            onClick={() => {
              normalLoginAction();
            }}
          >
            登录
          </button>
        </div>
      </div>
    </div>
  </div>)
}
export default LoginPage