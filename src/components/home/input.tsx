import { Button, Input } from "antd-mobile";
import mud from "../../assets/mud.png";
import right from "../../assets/right.svg";
import { useNavigate } from "react-router-dom";

export const HomeInput = () => {
  const navigate = useNavigate();

  const handleToDelegate = () => {
    navigate("/home/history");
  };
  
  return (
    <div className="bg-white mx-4 rounded-2xl p-4 mt-4 relative overflow-hidden">
      <div className="flex items-center">
        <img src={mud} className="h-8 w-8" alt="" />
        <span className="ml-2 text-base font-medium">MUD</span>
      </div>
      <div className="absolute rounded-lg bg-[#46D69C1A] w-12 h-11 right-4 top-4 text-center border-primary border-solid border-2">
        <div className="text-sm mt-0.5 font-medium">120天</div>
        <div className="text-xs text-[#989898]">期限</div>
      </div>
      <div
        className="flex mt-6 justify-between items-center"
        onClick={handleToDelegate}
      >
        <span className="text-sm">已质押</span>
        <div className="flex items-center">
          <div className="text-center mr-2">
            <div className="text-sm">120USDT</div>
            <div className="text-xs text-[#989898]">350MUD</div>
          </div>
          <img src={right} className="w-4 h-4" alt="" />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="text-center">
          <div className="text-sm">20%年化+推广</div>
          <div className="text-xs text-[#989898]">收益</div>
        </div>
        <div className="h-5 w-[1px] bg-[#F0F0F0] mt-2"></div>
        <div className="text-center">
          <div className="text-sm">100USDT</div>
          <div className="text-xs text-[#989898]">≈220 MUD</div>
        </div>
        <div className="h-5 w-[1px] bg-[#F0F0F0] mt-2"></div>
        <div className="text-center">
          <div className="text-sm">8</div>
          <div className="text-xs text-[#989898]">期数</div>
        </div>
        <div className="h-5 w-[1px] bg-[#F0F0F0] mt-2"></div>
        <div className="text-center">
          <div className="text-sm">15天</div>
          <div className="text-xs text-[#989898]">每期</div>
        </div>
      </div>
      <div className="bg-[#F3F3F3] mt-4 flex rounded-xl py-2 px-3 items-center">
        <Input />
        <div className="h-6 w-[1px] bg-[#D1D1D1] mr-5"></div>
        <div className="shrink-0 text-base">全部</div>
      </div>
      <div className="mt-4">
        <Button className="w-full" color="primary">
          质押
        </Button>
      </div>
    </div>
  );
};
