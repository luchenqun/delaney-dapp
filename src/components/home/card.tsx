import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import headImg from "../../assets/headImg.png";
import logo from "../../assets/logo.svg";
import usdt from "../../assets/usdt.png";
import mud from "../../assets/mud.png";
import copyIcon from "../../assets/copy.svg";
import link from "../../assets/link.svg";
import copy from "copy-to-clipboard";
import { Modal } from "antd-mobile";

export const HomeCard = () => {
  const handleCopy = () => {
    copy("Text");
    Modal.alert({
      content: "复制成功",
    });
  };

  return (
    <div className="bg-white mx-4 rounded-2xl p-3 mt-4 relative overflow-hidden">
      <img
        src={logo}
        alt=""
        className="absolute w-20 h-20 right-[-8px] top-[-12px] opacity-20"
      />
      <div className="flex">
        <img className="w-12 h-12 rounded-[50%]" src={headImg} alt="" />
        <div className="ml-3">
          <div className="text-sm flex items-center">
            <span>我的星级:</span>
            <Rating
              className="w-24 ml-1 relative top-[-0.1rem]"
              value={3}
              readOnly
              itemStyles={{
                itemShapes: ThinRoundedStar,
                activeFillColor: "#FEC533",
                inactiveFillColor: "#F3F3F3",
              }}
            />
          </div>
          <div className="text-sm mt-1 flex">
            <span>邀请码:822564</span>
            <img onClick={handleCopy} className="ml-1" src={copyIcon} alt="" />
            <img className="ml-1" src={link} alt="" />
          </div>
        </div>
      </div>
      <div className="flex mt-3 justify-between">
        <div className="w-24 bg-[#F3F3F3] rounded-xl flex flex-wrap justify-center py-1">
          <div className="flex items-center">
            <img className="w-4 h-4" src={usdt} alt="" />
            <span className="ml-1 text-sm">USDT</span>
          </div>
          <div className="font-medium text-base">1257.54</div>
        </div>
        <div className="w-24 bg-[#F3F3F3] rounded-xl flex flex-wrap justify-center py-1">
          <div className="flex items-center">
            <img className="w-4 h-4" src={mud} alt="" />
            <span className="ml-1 text-sm">MUD</span>
          </div>
          <div className="font-medium text-base">1257.54</div>
        </div>
        <div className="w-24 bg-[#FEC533] font-semibold text-base rounded-xl flex flex-wrap justify-center items-center py-1">
          交易
        </div>
      </div>
    </div>
  );
};
