import { Button, NavBar } from "antd-mobile";
import right from "../../assets/right.svg";

export const Benifit = () => {
  return <>
    <NavBar back={null}>领取收益</NavBar> 
    <div className="bg-[#F5F5F5] min-h-screen pt-3">
      <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
        <div className="text-base font-medium">收益</div>
        <div className="flex justify-between items-center mt-4">
          <div>
            累计总收益
          </div>
          <div className="flex items-center">
            <div>
              <div className="text-sm text-[#FF3F3F] font-medium">120USDT</div>
              <div className="text-xs">≈350MUD</div>
            </div>
            <div className="ml-2">
              <img src={right} alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div>
            累计提取
          </div>
          <div className="flex items-center">
            <div>
              <div className="text-sm text-[#FF3F3F] font-medium">120USDT</div>
              <div className="text-xs">≈350MUD</div>
            </div>
            <div className="ml-2">
              <img src={right} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl mt-6 pt-6 text-center">
        <div className="text-[#989898]">可提取数量</div>
        <div className="text-[2rem] font-semibold">32 USDT</div>
        <div className="text-base relative top-[-0.5rem]">≈88MUD</div>
        <div className="w-full flex justify-between mt-4">
          <span>手续费 <span className="text-[#46D69C]">2%</span></span>
          <span>0.033USDT</span>
        </div>
        <div className="w-full flex justify-between mt-2">
          <span>实际到账</span>
          <span>≈80MUD</span>
        </div>
        <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-28"></div>
        <Button color="primary" className="w-full">提取</Button>
      </div>
    </div>
  </>;
};
