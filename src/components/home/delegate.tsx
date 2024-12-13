import { Button, Input, Toast } from 'antd-mobile';
import mud from '../../assets/mud.png';
import right from '../../assets/right.svg';
import { useNavigate } from 'react-router-dom';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { getDelegateUserStat } from '../../utils/api';
import { humanReadable, formatSeconds, afterSeconds, UsdtPrecision, usdtToMud, mudToUsdt } from '../../utils/tools';
import { ADDRESS_CONFIG } from '../../utils/wagmi';
import delaneyAbi from '../../../abi/delaney.json';
import useContractBalance from '../../hook/useContractBalance';
import { useMudPrice } from '../../hook/useMudPrice';
import { parseEther } from 'viem';

export const HomeDelegate = forwardRef((props: any, ref) => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [delegateUserStat, setDelegateUserStat] = useState<any>(null);
  const [time, setTime] = useState('-');
  const [delegateMudMin, setDelegateMudMin] = useState<bigint>(0n);
  const [userInput, setUserInput] = useState<string | number>('');
  const [isAllow, setIsAllow] = useState(false);
  const { data: hash, writeContract, isPending, isError, status } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const [btnLoading, setBtnLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refreshData();
    }
  }));

  const refreshData = () => {
    if (address) {
      getData();
      refetchMud();
      refetchConfig();
      refetchMudPrice();
    }
  };

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
      Toast.show({ content: '质押成功' });
      setTimeout(() => {
        refreshData();
        props?.refresh?.();
      }, 1000);
    }
  }, [isLoading, isSuccess, hash]);

  const { data: mudBalance, refetch: refetchMud } = useContractBalance(address as string);

  useEffect(() => {
    if (mudBalance) {
      setIsAllow(Number(humanReadable(mudBalance)) > Number(userInput));
    }
  }, [mudBalance, userInput]);

  const { data: config, refetch: refetchConfig } = useReadContract({
    address: ADDRESS_CONFIG.delaney,
    abi: delaneyAbi,
    functionName: 'getConfigs',
    args: []
  });

  const { price: mudPrice, refetch: refetchMudPrice } = useMudPrice();

  const handleAll = () => {
    if (mudBalance) {
      console.log('====================>', mudBalance);
      setUserInput(humanReadable(mudBalance || 0));
    }
  };

  useEffect(() => {
    if (config && mudPrice) {
      const time = Number(config[1]) * Number(config[2]);
      setTime(formatSeconds(time));
      setDelegateMudMin(usdtToMud(Number(config?.[14] || 0), mudPrice));
    }
  }, [config, mudPrice]);

  const handleToDelegate = () => {
    navigate('/home/history');
  };

  useEffect(() => {
    if (address) {
      getData();
    }
  }, [address]);

  const getData = () => {
    getDelegateUserStat({ address: address as string }).then((res) => {
      setDelegateUserStat(res.data.data);
    });
  };

  const handleGetBtnDisabled = () => {
    return !userInput || parseEther(String(userInput)) <= delegateMudMin || parseEther(String(userInput)) > (mudBalance || 0n);
  };

  const handleDelegate = async () => {
    if (!userInput || !mudBalance) return;

    const input = parseEther(String(userInput));
    if (input > mudBalance) {
      Toast.show({ content: '质押数量不能超过最大可质押数量' });
    } else if (input < delegateMudMin) {
      Toast.show({ content: '质押数量不能低于起投金额' });
      return;
    }
    setBtnLoading(true);
    // 质押
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'delegate',
      args: [parseEther(String(userInput)), 0, afterSeconds(10 * 60)]
    });
  };

  return (
    <div className="bg-white mx-4 rounded-2xl p-4 mt-4 relative overflow-hidden">
      <div className="flex items-center">
        <img src={mud} className="h-8 w-8" alt="" />
        <span className="ml-2 text-base font-medium">MUD</span>
      </div>
      <div className="absolute rounded-lg bg-[#46D69C1A] px-1 h-11 right-4 top-4 text-center border-primary border-solid border-2">
        <div className="text-sm mt-0.5 font-medium">{time}</div>
        <div className="text-xs text-[#989898]">期限</div>
      </div>
      <div className="flex mt-6 justify-between items-center" onClick={handleToDelegate}>
        <span className="text-sm">已质押</span>
        <div className="flex items-center">
          <div className="text-right mr-2">
            <div className="text-sm">{humanReadable(delegateUserStat?.mud || 0)} MUD</div>
            <div className="text-xs text-[#989898]">{humanReadable(delegateUserStat?.usdt || 0)} USDT</div>
          </div>
          <img src={right} className="w-4 h-4" alt="" />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="text-center">
          <div className="text-sm">121%年化+推广</div>
          <div className="text-xs text-[#989898]">收益</div>
        </div>
        <div className="h-5 w-[1px] bg-[#F0F0F0] mt-2"></div>
        <div className="text-center relative">
          <div className="text-sm">{humanReadable(config?.[14] || 0, UsdtPrecision)} USDT</div>
          <div className="text-xs text-[#989898]">≈ {humanReadable(delegateMudMin)} MUD</div>
          <div className="absolute right-[-15px] top-[-15px] text-xs rounded-lg rounded-bl-none bg-[#FF3636] font-[10px] text-white px-1">起投</div>
        </div>
        <div className="h-5 w-[1px] bg-[#F0F0F0] mt-2"></div>
        <div className="text-center">
          <div className="text-sm">{config?.[2]?.toString() || '-'}</div>
          <div className="text-xs text-[#989898]">期数</div>
        </div>
        <div className="h-5 w-[1px] bg-[#F0F0F0] mt-2"></div>
        <div className="text-center">
          <div className="text-sm">{formatSeconds(Number(config?.[1]))}</div>
          <div className="text-xs text-[#989898]">每期</div>
        </div>
      </div>
      <div className="bg-[#F3F3F3] mt-4 flex rounded-xl py-2 px-3 items-center">
        <Input type="number" value={`${userInput}`} onChange={(value) => setUserInput(value)} />
        <div className="h-6 w-[1px] bg-[#D1D1D1] mr-5"></div>
        <div className="shrink-0 text-base" onClick={handleAll}>
          全部
        </div>
      </div>
      {userInput && (
        <div className="flex justify-between mt-4 relative top-[-10px]">
          <span className="text-xs">质押价值</span>
          <span className="text-xs text-[#FF3F3F]">≈ {humanReadable(mudToUsdt(parseEther(String(userInput)), mudPrice || 0n), UsdtPrecision) || '-'} USDT</span>
        </div>
      )}
      <div className="mt-4">
        <Button loading={btnLoading} disabled={!userInput || handleGetBtnDisabled()} className="w-full" color="primary" onClick={handleDelegate}>
          {isAllow ? '质押' : '授权'}
        </Button>
      </div>
    </div>
  );
});
