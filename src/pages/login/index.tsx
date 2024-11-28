import { PasscodeInput } from 'antd-mobile'
import colorBg from '../../assets/color-bg.png'
import logo from '../../assets/logo.svg'

export const Login = () => {
  return <>
    <div>
      <img className="w-screen absolute left-0 top-0" src={colorBg} alt="背景" />
      <div className="relative z-10 w-full flex justify-center pt-24">
        <div className="flex flex-wrap justify-center">
          <img src={logo} className="text-center" alt="" />
          <span className="w-full text-center font-normal text-xl">Delaney</span>
        </div>
      </div>
      <div className="mt-10 text-xl text-center font-semibold">请输入您的邀请码</div>
      <div className="flex justify-center mt-6">
        <PasscodeInput seperated />
      </div>
      <div className="mt-3 text-center text-base">
        请先 <span className="text-[#2A66FF]">连接钱包</span> 以绑定邀请码
      </div>
      <div className="flex justify-center w-screen absolute bottom-20">
        <div className="flex justify-center items-center font-bold w-80 text-xl h-11 rounded-xl bg-[#46D69C]">{`确认`}</div>
      </div>
    </div>
  </>
}