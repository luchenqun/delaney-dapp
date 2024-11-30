import { NavBar, Tabs } from "antd-mobile";
import check from "../../assets/check.svg";
import lock from "../../assets/lock.svg";
import time from "../../assets/time.svg";
import { BenifitCard } from "../../components/benifit/card";
import { BenifitCardPromotion } from "../../components/benifit/card-promotion";

export const BenifitDetail = () => {
  const handleBack = () => {
    history.back();
  };

  return (
    <>
      <NavBar onBack={handleBack}>收益列表详情</NavBar>
      <div className="bg-[#F5F5F5] min-h-screen">
        <Tabs activeLineMode="fixed">
          <Tabs.Tab title="质押生息" key="fruits">
            <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="text-[#989898] text-sm flex items-center">
                  <img src={check} alt="" />
                  <span className="ml-1">直推质押</span>
                </span>
                <div className="text-right">
                  <div className="font-semibold text-sm">120 USDT</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#989898] text-sm flex items-center">
                  <img src={time} alt="" />
                  <span className="ml-1">待领取</span>
                </span>
                <div className="text-right">
                  <div className="font-semibold text-sm">120 USDT</div>
                  <div className="text-xs">≈350 MUD</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#989898] text-sm flex items-center">
                  <img src={lock} alt="" />
                  <span className="ml-1">待解锁</span>
                </span>
                <div className="text-right">
                  <div className="font-semibold text-sm">120 USDT</div>
                  <div className="text-xs">≈350 MUD</div>
                </div>
              </div>
            </div>
            <BenifitCard />
          </Tabs.Tab>
          <Tabs.Tab title="推广收益" key="vegetables">
            <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="text-[#989898] text-sm flex items-center">
                  <img src={check} alt="" />
                  <span className="ml-1">直推质押</span>
                </span>
                <div className="text-right">
                  <div className="font-semibold text-sm">120 USDT</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#989898] text-sm flex items-center">
                  <img src={time} alt="" />
                  <span className="ml-1">待领取</span>
                </span>
                <div className="text-right">
                  <div className="font-semibold text-sm">120 USDT</div>
                  <div className="text-xs">≈350 MUD</div>
                </div>
              </div>
            </div>
            <BenifitCardPromotion />
          </Tabs.Tab>
        </Tabs>
      </div>
    </>
  );
};
