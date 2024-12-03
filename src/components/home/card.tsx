import { Rating, ThinRoundedStar } from '@smastrom/react-rating';
import logo from '../../assets/logo.svg';
import usdt from '../../assets/usdt.png';
import mud from '../../assets/mud.png';
import copyIcon from '../../assets/copy.svg';
import link from '../../assets/link.svg';
import copy from 'copy-to-clipboard';
import { DotLoading, Modal, Skeleton } from 'antd-mobile';
import { useAccount, useReadContract } from 'wagmi';
import { useEffect, useState } from 'react';
import { getUser } from '../../utils/api';
import { toSvg } from 'jdenticon';
import { divideByMillionAndRound } from '../../utils/tools';
import { erc20Abi } from 'viem';
import { ADDRESS_CONFIG } from '../../utils/wagmi';

export const HomeCard = () => {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const [userInfo, setUserInfo] = useState<any>(null);

  const { data: mudBalance, isLoading: mudLoading } = useReadContract({
    address: ADDRESS_CONFIG.mud,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`]
  });

  const { data: usdtBalance, isLoading: usdtLoading } = useReadContract({
    address: ADDRESS_CONFIG.usdt,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`]
  });

  useEffect(() => {
    if (address) {
      setLoading(true);
      getUser({ address }).then((res) => {
        setUserInfo(res.data.data);
        setLoading(false);
      });
    }
  }, [address]);

  const handleCopy = () => {
    copy(userInfo?.ref);
    Modal.alert({
      content: '复制成功'
    });
  };

  const handleLink = () => {
    copy(window.location.origin);
    Modal.alert({
      content: '复制网址成功, 分享给好友吧~'
    });
  };

  if (loading || mudLoading || usdtLoading) {
    return (
      <div className="bg-white h-36 mx-4 rounded-2xl text-2xl p-3 mt-4 relative overflow-hidden flex justify-center items-center">
        <DotLoading />
      </div>
    );
  }

  return (
    <div className="bg-white mx-4 rounded-2xl p-3 mt-4 relative overflow-hidden">
      <img src={logo} alt="" className="absolute w-20 h-20 right-[-8px] top-[-12px] opacity-20" />
      <div className="flex">
        <img className="w-12 h-12 rounded-[50%]" src={`data:image/svg+xml;utf8,${encodeURIComponent(toSvg(address, 200))}`} alt="" />
        <div className="ml-3">
          <div className="text-sm flex items-center mt-1">
            <span>我的星级:</span>
            <Rating
              className="w-24 ml-1 relative top-[-0.1rem]"
              value={Math.max(userInfo?.star, userInfo?.min_star)}
              readOnly
              itemStyles={{
                itemShapes: ThinRoundedStar,
                activeFillColor: '#FEC533',
                inactiveFillColor: '#F3F3F3'
              }}
            />
          </div>
          <div className="text-sm mt-1 flex">
            <span>邀请码: {userInfo?.ref}</span>
            <img onClick={handleCopy} className="ml-1" src={copyIcon} alt="" />
            <img onClick={handleLink} className="ml-1" src={link} alt="" />
          </div>
        </div>
      </div>
      <div className="flex mt-3 justify-between">
        <div className="w-24 bg-[#F3F3F3] rounded-xl flex flex-wrap justify-center py-1">
          <div className="flex items-center">
            <img className="w-4 h-4" src={usdt} alt="" />
            <span className="ml-1 text-sm">USDT</span>
          </div>
          <div className="font-medium text-base w-full text-center">{divideByMillionAndRound(usdtBalance || 0)}</div>
        </div>
        <div className="w-24 bg-[#F3F3F3] rounded-xl flex flex-wrap justify-center py-1">
          <div className="flex items-center">
            <img className="w-4 h-4" src={mud} alt="" />
            <span className="ml-1 text-sm">MUD</span>
          </div>
          <div className="font-medium text-base w-full text-center">{divideByMillionAndRound(mudBalance || 0)}</div>
        </div>
        <div className="w-24 bg-[#FEC533] font-semibold text-base rounded-xl flex flex-wrap justify-center items-center py-1">交易</div>
      </div>
    </div>
  );
};
