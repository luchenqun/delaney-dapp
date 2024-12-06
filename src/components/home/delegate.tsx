import { Button, Input, Toast } from 'antd-mobile';
import mud from '../../assets/mud.png';
import right from '../../assets/right.svg';
import { useNavigate } from 'react-router-dom';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { getDelegateUserStat } from '../../utils/api';
import { divideByMillionAndRound, formatSeconds, afterSeconds } from '../../utils/tools';
import { ADDRESS_CONFIG } from '../../utils/wagmi';
import delaneyAbi from '../../../abi/delaney.json';
import { erc20Abi } from 'viem';
import { TxType } from '../../utils/data';
import useContractBalance from '../../hook/useContractBalance';
import { useMudPrice } from '../../hook/useMudPrice';

export const HomeDelegate = forwardRef((props: any, ref) => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [delegateUserStat, setDelegateUserStat] = useState<any>(null);
  const [time, setTime] = useState('-');
  const [mudMax, setMudMax] = useState<number>(0);
  const [userInput, setUserInput] = useState<string | number>('');
  const [isAllow, setIsAllow] = useState(false);
  const [txType, setTxType] = useState<TxType>(TxType.Approve);
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
      refetchAllowance();
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
      Toast.show({ content: txType == TxType.Approve ? '授权成功' : '质押成功' });
      setTimeout(() => {
        refreshData();
        props?.refresh?.();
      }, 1000);
    }
  }, [isLoading, isSuccess, txType, hash]);

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: ADDRESS_CONFIG.mud,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address as `0x${string}`, ADDRESS_CONFIG.delaney]
  });

  useEffect(() => {
    if (allowance) {
      setIsAllow(divideByMillionAndRound(Number(allowance)) > Number(userInput));
    }
  }, [allowance, userInput]);

  // const { data: mudBalance, refetch: refetchMud } = useReadContract({
  //   address: ADDRESS_CONFIG.mud,
  //   abi: erc20Abi,
  //   functionName: 'balanceOf',
  //   args: [address as `0x${string}`]
  // });

  const { data: mudBalance, refetch: refetchMud } = useContractBalance(address as string, ADDRESS_CONFIG.mud);

  const { data: configData, refetch: refetchConfig } = useReadContract({
    address: ADDRESS_CONFIG.delaney,
    abi: delaneyAbi,
    functionName: 'getConfigs',
    args: []
  });

  // const { data: mudPrice, refetch: refetchMudPrice } = useReadContract({
  //   functionName: 'mudPrice',
  //   abi: delaneyAbi,
  //   address: import.meta.env.VITE_APP_DELANEY_ADDRESS,
  //   args: []
  // });

  const { price: mudPrice, refetch: refetchMudPrice } = useMudPrice();

  const handleAll = () => {
    if (mudBalance) {
      setUserInput(divideByMillionAndRound(mudBalance));
    }
  };

  useEffect(() => {
    if (configData) {
      const time = Number(configData[0]) * Number(configData[1]);
      setTime(formatSeconds(time));
      setMudMax(divideByMillionAndRound(Number(configData?.[13] || 0) / divideByMillionAndRound(Number(mudPrice))));
    }
  }, [configData, mudPrice]);

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
    return !userInput || Number(userInput) <= mudMax || Number(userInput) > (Number(mudBalance) / 1000000);
  };

  const handleDelegate = async () => {
    if (userInput) {
      const input = Number(userInput);
      if (input > (Number(mudBalance) / 1000000)) {
        Toast.show({
          content: '质押数量不能超过最大可质押数量'
        });
        refetchAllowance();
      } else if (input <= mudMax) {
        Toast.show({
          content: '质押数量不能低于起投金额'
        });
        return;
      }
    }
    setBtnLoading(true);
    if (isAllow) {
      // 质押
      writeContract({
        address: ADDRESS_CONFIG.delaney,
        abi: delaneyAbi,
        functionName: 'delegate',
        args: [BigInt(Number(userInput) * 1000000), 0, afterSeconds(10 * 60)]
      });
      setTxType(TxType.Delegate);
    } else {
      // 授权
      writeContract({
        address: ADDRESS_CONFIG.mud,
        abi: erc20Abi,
        functionName: 'approve',
        args: [ADDRESS_CONFIG.delaney, 100000000000000n]
      });
      setTxType(TxType.Approve);
    }
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
            <div className="text-sm">{divideByMillionAndRound(delegateUserStat?.mud || 0)} MUD</div>
            <div className="text-xs text-[#989898]">{divideByMillionAndRound(delegateUserStat?.usdt || 0)} USDT</div>
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
          <div className="text-sm">{divideByMillionAndRound(configData?.[13] || 0)} USDT</div>
          <div className="text-xs text-[#989898]">≈ {mudMax} MUD</div>
          <div className="absolute right-[-15px] top-[-15px] text-xs rounded-lg rounded-bl-none bg-[#FF3636] font-[10px] text-white px-1">起投</div>
        </div>
        <div className="h-5 w-[1px] bg-[#F0F0F0] mt-2"></div>
        <div className="text-center">
          <div className="text-sm">{configData?.[1]?.toString() || '-'}</div>
          <div className="text-xs text-[#989898]">期数</div>
        </div>
        <div className="h-5 w-[1px] bg-[#F0F0F0] mt-2"></div>
        <div className="text-center">
          <div className="text-sm">{formatSeconds(Number(configData?.[0]))}</div>
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
          <span className="text-xs text-[#FF3F3F]">≈ {divideByMillionAndRound(Number(userInput) * Number(mudPrice)) || '-'} USDT</span>
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
