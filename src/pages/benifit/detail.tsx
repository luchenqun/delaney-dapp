import { DotLoading, NavBar, Tabs } from "antd-mobile";
import check from "../../assets/check.svg";
import lock from "../../assets/lock.svg";
import time from "../../assets/time.svg";
import { BenifitCard } from "../../components/benifit/card";
import { BenifitCardPromotion } from "../../components/benifit/card-promotion";
import { getDynamicRewards, getDynamicRewardUser, getStaticRewards, getStaticRewardUser } from "../../utils/api";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { divideByMillionAndRound } from "../../utils/tools";

export const BenifitDetail = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [dynamicRewardUser, setDynamicRewardUser] = useState<any>(null);
  const [staticRewardUser, setStaticRewardUser] = useState<any>(null);
  const [staticRewards, setStaticRewards] = useState<any>(null);
  const [dynamicRewards, setDynamicRewards] = useState<any>(null);
  
  const handleBack = () => {
    history.back();
  };

  console.log(dynamicRewards);

  useEffect(() => {
    if (address) {
      setLoading(true);
      Promise.all([
        getDynamicRewardUser({ address }),
        getStaticRewardUser({ address }),
        getStaticRewards({ address }),
        getDynamicRewards({ address })
      ]).then(([dynamicRes, staticRes, staticRewardsRes, dynamicRewardsRes]) => {
        setDynamicRewardUser(dynamicRes.data.data);
        setStaticRewardUser(staticRes.data.data);
        setStaticRewards(staticRewardsRes.data.data.items);
        setDynamicRewards(dynamicRewardsRes.data.data.items);
        setLoading(false);
      }).catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return <div className="bg-[#F5F5F5] min-h-screen">
      <NavBar onBack={handleBack}>收益列表详情</NavBar>
      <div className="h-36 mx-4 text-2xl rounded-2xl mt-4 relative overflow-hidden flex justify-center items-center">
        <DotLoading color="primary" />
      </div>
    </div>
  }

  return (
    <>
      <div className="fixed top-0 z-10 bg-white w-screen">
        <NavBar onBack={handleBack}>收益列表详情</NavBar>
      </div>
      <div className="bg-[#F5F5F5] min-h-screen pt-9">
        <Tabs activeLineMode="fixed">
          <Tabs.Tab title="质押生息" key="fruits">
            <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="text-[#989898] text-sm flex items-center">
                  <img src={check} alt="" />
                  <span className="ml-1">直推质押</span>
                </span>
                <div className="text-right">
                  <div className="font-semibold text-sm">{divideByMillionAndRound(staticRewardUser?.claimed_usdt || 0)} USDT</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#989898] text-sm flex items-center">
                  <img src={time} alt="" />
                  <span className="ml-1">待领取</span>
                </span>
                <div className="text-right">
                  <div className="font-semibold text-sm">{divideByMillionAndRound(staticRewardUser?.unclaimed_usdt || 0)} USDT</div>
                  <div className="text-xs">≈{divideByMillionAndRound(staticRewardUser?.unclaimed_mud || 0)} MUD</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#989898] text-sm flex items-center">
                  <img src={lock} alt="" />
                  <span className="ml-1">待解锁</span>
                </span>
                <div className="text-right">
                  <div className="font-semibold text-sm">{divideByMillionAndRound(staticRewardUser?.locked_usdt || 0)} USDT</div>
                  <div className="text-xs">≈{divideByMillionAndRound(staticRewardUser?.locked_mud || 0)} MUD</div>
                </div>
              </div>
            </div>
            {staticRewards?.map((item: any) => (
              <BenifitCard key={item.id} info={item} />
            ))}
          </Tabs.Tab>
          <Tabs.Tab title="推广收益" key="vegetables">
            <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="text-[#989898] text-sm flex items-center">
                  <img src={check} alt="" />
                  <span className="ml-1">直推质押</span>
                </span>
                <div className="text-right">
                  <div className="font-semibold text-sm">{divideByMillionAndRound(dynamicRewardUser?.claimed_usdt || 0)} USDT</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#989898] text-sm flex items-center">
                  <img src={time} alt="" />
                  <span className="ml-1">待领取</span>
                </span>
                <div className="text-right">
                  <div className="font-semibold text-sm">{divideByMillionAndRound(dynamicRewardUser?.unclaimed_usdt || 0)} USDT</div>
                  <div className="text-xs">≈{divideByMillionAndRound(dynamicRewardUser?.unclaimed_mud || 0)} MUD</div>
                </div>
              </div>
            </div>
            {dynamicRewards?.map((item: any) => (
              <BenifitCardPromotion key={item.id} info={item} />
            ))}
          </Tabs.Tab>
        </Tabs>
      </div>
    </>
  );
};
