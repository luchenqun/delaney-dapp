import copy from "copy-to-clipboard";
import copyIcon from "../../assets/copy.svg";
import { Modal, Tag } from "antd-mobile";

export const BenifitCard = () => {
  const handleCopy = () => {
    copy("Text");
    Modal.alert({
      content: "复制成功",
    });
  };

  return (
    <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl mt-3">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">收益</span>
          <div className="text-right">
            <div className="text-sm">10.8USDT</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">期数</span>
          <div className="text-right">
            <div className="text-sm">第1期</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">解锁时间</span>
          <div className="text-right">
            <div className="text-sm">2021-07-06 14:19:04</div>
          </div>
        </div>
        <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-4"></div>
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">领取哈希</span>
          <div className="text-right">
            <div className="text-sm text-[#2A66FF] flex">
              125d4decaf5929f64...dada
              <img
                onClick={handleCopy}
                className="ml-1"
                src={copyIcon}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">领取时间</span>
          <div className="text-right">
            <div className="text-sm">2021-07-06 14:19:04</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">状态</span>
          <div className="text-right">
            <div className="text-sm">
              <Tag color="danger">未领取</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
