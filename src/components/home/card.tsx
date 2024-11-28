import headImg from "../../assets/headImg.png";
import logo from "../../assets/logo.svg";
import usdt from "../../assets/usdt.png";
import mud from "../../assets/mud.png";

export const HomeCard = () => {
  return <div className="bg-white mx-4 rounded-2xl p-3 mt-4 relative overflow-hidden">
    <img src={logo} alt="" className="absolute right-[-5px] top-[-5px] opacity-20" />
    <div className="flex">
      <img className="w-12 h-12 rounded-[50%]" src={headImg} alt="" />
      <div className="ml-3">
        <div className="text-sm">我的星级:</div>
        <div className="text-sm mt-1">邀请码:822564</div>
      </div>
    </div>
    <div className="flex mt-3 justify-between">
      <div className="w-24 bg-[#F3F3F3] rounded-xl flex flex-wrap justify-center py-1">
        <div className="flex items-center">
          <img className="w-4 h-4" src={usdt} alt="" />
          <span className="ml-1">USDT</span>
        </div>
        <div className="font-medium text-base">1257.54</div>
      </div>
      <div className="w-24 bg-[#F3F3F3] rounded-xl flex flex-wrap justify-center py-1">
        <div className="flex items-center">
          <img className="w-4 h-4" src={mud} alt="" />
          <span className="ml-1">MUD</span>
        </div>
        <div className="font-medium text-base">1257.54</div>
      </div>
      <div className="w-24 bg-[#FEC533] font-semibold text-base rounded-xl flex flex-wrap justify-center items-center py-1">
        交易
      </div>
    </div>
  </div>
}