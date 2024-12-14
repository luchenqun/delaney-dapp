import { Button, DotLoading, NavBar, PullToRefresh, Skeleton, Toast, NoticeBar } from 'antd-mobile';
import right from '../../assets/right.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { getClaimUserStat, getLatestClaim, getRewardUserStat, signClaim, getConfig } from '../../utils/api';
import { humanReadable, MudPrecision, mudToUsdt, UsdtPrecision } from '../../utils/tools';
import { ADDRESS_CONFIG } from '../../utils/wagmi';
import delaneyAbi from '../../../abi/delaney.json';
import { sleep } from 'antd-mobile/es/utils/sleep';

export const Benifit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const [rewardUserStat, setRewardUserStat] = useState<any>(null);
  const [claimUserStat, setClaimUserStat] = useState<any>(null);
  const [latestClaim, setLatestClaim] = useState<any>(null);
  const { data: hash, writeContract, isPending, isError, status } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const [btnLoading, setBtnLoading] = useState(false);
  const [fee, setFee] = useState(0);
  const [claimMinUsdt, setClaimMinUsdt] = useState(0);

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected]);

  useEffect(() => {
    fetchData(address);
  }, [address]);

  useEffect(() => {
    if (isPending) {
      setBtnLoading(true);
    }
    if (isError) {
      setBtnLoading(false);
    }
  }, [isPending, isError, status]);

  useEffect(() => {
    if (hash) {
      setBtnLoading(isLoading);
    }
    if (isSuccess) {
      Toast.show('奖励领取成功');
      setTimeout(() => {
        fetchData(address);
      }, 3000);
    }
  }, [isLoading, isSuccess, hash, address]);

  const fetchData = async (address: string | undefined) => {
    if (!address) {
      return;
    }
    setLoading(true);
    Promise.all([getRewardUserStat({ address }), getClaimUserStat({ address }), getLatestClaim({ address }), getConfig()])
      .then(([rewardRes, claimRes, latestClaimRes, configRes]) => {
        setRewardUserStat(rewardRes.data.data);
        setClaimUserStat(claimRes.data.data);
        setLatestClaim(latestClaimRes.data.data);
        setClaimMinUsdt(configRes.data.data.claim_min_usdt);
        setFee(configRes.data.data.fee);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleToDetail = () => {
    navigate('/benifit/detail');
  };

  const handleToClaimDetail = () => {
    navigate('/claim');
  };

  const { data: paused } = useReadContract({
    address: ADDRESS_CONFIG.delaney,
    abi: delaneyAbi,
    functionName: 'paused',
    args: []
  });

  console.log({ paused });

  const handleClaim = async () => {
    if (!address) {
      return;
    }
    setBtnLoading(true);
    const minMud = 0;
    const res = await signClaim({ address, usdt: latestClaim.usdt, min_mud: minMud, reward_ids: latestClaim.reward_ids });
    latestClaim.is_sign = true;
    setLatestClaim(latestClaim);
    const { signature, deadline } = res.data.data;
    console.log({ signature, deadline });
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'claim',
      args: [latestClaim.usdt, minMud, JSON.stringify(latestClaim.reward_ids), signature, deadline]
    });
  };

  return (
    <>
      <div className="top-0 z-10 fixed left-0 right-0 header-bg">
        <NavBar back={null}>领取收益</NavBar>
      </div>
      <div className="bg-[#F5F5F5] min-h-screen pt-14">
        <PullToRefresh
          onRefresh={async () => {
            if (address) {
              fetchData(address);
              await sleep(1000);
            }
          }}
        >
          <>
            <div className="w-[21.4rem] flex justify-between gap-2 mx-auto rounded-2xl">
              <div className="bg-white px-3 py-2 rounded-lg w-full" onClick={handleToDetail}>
                <div className="flex justify-between">
                  <span>总收益</span>
                  <span>(USDT)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-left w-full">
                    <div className="text-2xl font-medium leading-9">
                      {loading ? (
                        <>
                          <Skeleton.Paragraph lineCount={1} animated />
                        </>
                      ) : (
                        <> {humanReadable(rewardUserStat?.usdt || 0, UsdtPrecision)}</>
                      )}
                    </div>
                    <div className="text-xs">
                      {loading ? (
                        <>
                          <Skeleton.Paragraph className="h-3" lineCount={1} animated />
                        </>
                      ) : (
                        <>≈{humanReadable(rewardUserStat?.mud || 0)} MUD</>
                      )}
                    </div>
                  </div>
                  <div className="ml-2">
                    <img src={right} alt="" />
                  </div>
                </div>
              </div>
              <div className="bg-white px-3 py-2 rounded-lg w-full" onClick={handleToClaimDetail}>
                <div className="flex justify-between">
                  <span>已提取</span>
                  <span>(USDT)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-left w-full">
                    <div className="text-2xl font-medium leading-9">
                      {loading ? (
                        <>
                          <Skeleton.Paragraph lineCount={1} animated />
                        </>
                      ) : (
                        <> {humanReadable(claimUserStat?.usdt || 0, UsdtPrecision)}</>
                      )}
                    </div>
                    <div className="text-xs">
                      {loading ? (
                        <>
                          <Skeleton.Paragraph className="h-3" lineCount={1} animated />
                        </>
                      ) : (
                        <>≈{humanReadable(claimUserStat?.mud || 0n, MudPrecision)} MUD</>
                      )}
                    </div>
                  </div>
                  <div className="ml-2">
                    <img src={right} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl mt-3 pt-6 text-center">
              <div className="text-[#989898]">可提取</div>
              <div className="text-[2rem] font-semibold">
                {loading ? (
                  <>
                    <Skeleton.Title className="h-10 w-full" animated />
                  </>
                ) : (
                  <> {humanReadable(latestClaim?.usdt || 0, UsdtPrecision)} USDT</>
                )}
              </div>
              <div className="text-base relative top-[-0.5rem]">
                {loading ? (
                  <>
                    <Skeleton.Paragraph className="h-3 w-full" lineCount={1} animated />
                  </>
                ) : (
                  <>≈ {humanReadable(latestClaim?.mud || 0)} MUD</>
                )}
              </div>
              <div className="w-full flex justify-between mt-4 items-center">
                <span className="flex-shrink-0">
                  手续费 <span className="text-[#46D69C]">{fee / 100}%</span>
                </span>
                <span>
                  {loading ? (
                    <>
                      <Skeleton.Paragraph className="h-1 w-10" lineCount={1} animated />
                    </>
                  ) : (
                    <>{humanReadable((BigInt(latestClaim?.mud || 0n) * BigInt(fee)) / BigInt(10000))} MUD</>
                  )}
                </span>
              </div>
              <div className="w-full flex justify-between mt-2 items-center">
                <span className="flex-shrink-0">实际到账</span>
                <span>
                  {loading ? (
                    <>
                      <Skeleton.Paragraph className="h-1 w-10" lineCount={1} animated />
                    </>
                  ) : (
                    <>{(humanReadable(latestClaim?.mud || 0n, MudPrecision) * (10000 - fee)) / 10000} MUD</>
                  )}
                </span>
              </div>
              <div className="w-full flex justify-between mt-2 items-center">
                <span className="flex-shrink-0">最少提取</span>
                <span>
                  {loading ? (
                    <>
                      <Skeleton.Paragraph className="h-1 w-10" lineCount={1} animated />
                    </>
                  ) : (
                    <> {humanReadable(claimMinUsdt, UsdtPrecision)} USDT</>
                  )}
                </span>
              </div>
              <div className="w-full justify-between mt-2 items-center mt-4">
                {loading ? (
                  <Skeleton.Paragraph className="w-full" lineCount={1} animated />
                ) : (
                  <NoticeBar content={latestClaim?.is_sign ? '您有一笔交易正在提取中，点击已提取可查看' : '一天只允许提取一次奖励，点击提取后不允许取消'} color="alert" />
                )}
              </div>
              <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-28"></div>
              <Button
                loading={btnLoading}
                disabled={isLoading || !latestClaim?.usdt || latestClaim?.usdt < claimMinUsdt || latestClaim?.is_sign || paused}
                color="primary"
                className="w-full"
                onClick={handleClaim}
              >
                {paused ? '暂停提取' : '提取'}
              </Button>
            </div>
          </>
        </PullToRefresh>
      </div>
    </>
  );
};
