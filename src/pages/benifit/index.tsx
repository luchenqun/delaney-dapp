import { Button, DotLoading, NavBar } from "antd-mobile";
import right from "../../assets/right.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getClaimUser, getLatestClaim, getRewardUser } from "../../utils/api";
import { divideByMillionAndRound } from "../../utils/tools";

export const Benifit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const [rewardUser, setRewardUser] = useState<any>(null);
  const [claimUser, setClaimUser] = useState<any>(null);
  const [latestClaim, setLatestClaim] = useState<any>(null);
  
  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected]);

  useEffect(() => {
    if (address) {
      setLoading(true);
      Promise.all([
        getRewardUser({ address }),
        getClaimUser({ address }),
        getLatestClaim({ address })
      ]).then(([rewardRes, claimRes, latestClaimRes]) => {
        setRewardUser(rewardRes.data.data);
        setClaimUser(claimRes.data.data);
        setLatestClaim(latestClaimRes.data.data);
        setLoading(false);
      }).catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    }
  }, []);

  const handleToDetail = () => {
    navigate("/benifit/detail");
  };

  if (loading) {
    return <div className="bg-[#F5F5F5] min-h-screen">
      <NavBar back={null}>领取收益</NavBar>
      <div className="h-36 mx-4 rounded-2xl mt-4 text-2xl relative overflow-hidden flex justify-center items-center">
        <DotLoading color="primary" />
      </div>
    </div>
  }

  return (
    <>
      <div className="sticky top-0 z-10">
        <NavBar back={null}>领取收益</NavBar>
      </div>
      <div className="bg-[#F5F5F5] min-h-screen pt-3">
        <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
          <div className="text-base font-medium">收益</div>
          <div
            className="flex justify-between items-center mt-4"
            onClick={handleToDetail}
          >
            <div>累计总收益</div>
            <div className="flex items-center">
              <div className="text-right">
                <div className="text-sm text-[#FF3F3F] font-medium">
                  {divideByMillionAndRound(rewardUser?.usdt || 0)} USDT
                </div>
                <div className="text-xs">≈{divideByMillionAndRound(rewardUser?.mud || 0)} USDTMUD</div>
              </div>
              <div className="ml-2">
                <img src={right} alt="" />
              </div>
            </div>
          </div>
          <div
            className="flex justify-between items-center mt-2"
            onClick={handleToDetail}
          >
            <div>累计提取</div>
            <div className="flex items-center">
              <div className="text-right">
                <div className="text-sm text-[#FF3F3F] font-medium">
                  {divideByMillionAndRound(claimUser?.usdt || 0)} USDT
                </div>
                <div className="text-xs">≈{divideByMillionAndRound(claimUser?.mud || 0)} MUD</div>
              </div>
              <div className="ml-2">
                <img src={right} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl mt-6 pt-6 text-center">
          <div className="text-[#989898]">可提取数量</div>
          <div className="text-[2rem] font-semibold">{divideByMillionAndRound(latestClaim?.usdt || 0)} USDT</div>
          <div className="text-base relative top-[-0.5rem]">≈{divideByMillionAndRound(latestClaim?.mud || 0)} MUD</div>
          <div className="w-full flex justify-between mt-4">
            <span>
              手续费 <span className="text-[#46D69C]">2%</span>
            </span>
            <span>0.033USDT</span>
          </div>
          <div className="w-full flex justify-between mt-2">
            <span>实际到账</span>
            <span>≈80MUD</span>
          </div>
          <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-28"></div>
          <Button color="primary" className="w-full">
            提取
          </Button>
        </div>
      </div>
    </>
  );
};
