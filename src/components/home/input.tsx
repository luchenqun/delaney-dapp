import { Button, Input, Toast } from 'antd-mobile';
import mud from '../../assets/mud.png';
import right from '../../assets/right.svg';
import { useNavigate } from 'react-router-dom';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import { getDelegateUser } from '../../utils/api';
import { divideByMillionAndRound, formatSeconds } from '../../utils/tools';
import { ADDRESS_CONFIG } from '../../utils/wagmi';
import delaneyAbi from '../../../abi/delaney.json';
import { erc20Abi } from 'viem';
import { writeContract } from 'viem/actions';

export const HomeInput = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [delegateUser, setDelegateUser] = useState<any>(null);
  const [time, setTime] = useState('-');
  const [mudMax, setMudMax] = useState<number>(0);
  const [userInput, setUserInput] = useState<string | number>('');
  const [isAllow, setIsAllow] = useState(false);
  const { writeContract: writeContractDelegate, isSuccess: isSuccessDelegate } = useWriteContract();
  const { writeContract: writeContractAllow, isSuccess: isSuccessAllow } = useWriteContract();
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (isSuccessDelegate) {
      Toast.show({
        content: '质押成功'
      });
      setBtnLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [isSuccessDelegate]);

  useEffect(() => {
    if (isSuccessAllow) {
      Toast.show({
        content: '授权成功'
      });
      refetchAllowance();
    }
  }, [isSuccessAllow]);

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

  const { data: mudBalance } = useReadContract({
    address: ADDRESS_CONFIG.mud,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`]
  });

  const { data: configData } = useReadContract({
    address: ADDRESS_CONFIG.delaney,
    abi: delaneyAbi,
    functionName: 'getConfigs',
    args: []
  });

  const { data: mudPrice } = useReadContract({
    functionName: 'mudPrice',
    abi: delaneyAbi,
    address: import.meta.env.VITE_APP_DELANEY_ADDRESS,
    args: []
  });

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
      getDelegateUser({ address }).then((res) => {
        setDelegateUser(res.data.data);
      });
    }
  }, []);

  const handleDelegate = async () => {
    if (userInput) {
      const input = Number(userInput);
      if (input > mudMax) {
        Toast.show({
          content: '质押数量不能超过最大可质押数量'
        });
        refetchAllowance();
      } else if (input <= 0) {
        Toast.show({
          content: '质押数量不能低于10 USDT'
        });
        return;
      }
    }
    if (isAllow) {
      // 质押
      console.log({
        address: ADDRESS_CONFIG.delaney,
        abi: delaneyAbi,
        functionName: 'delegate',
        args: [BigInt((Number(userInput) * 1000000)), 0, parseInt(new Date().getTime() / 1000) + 10 * 60]
      })
      writeContractDelegate({
        address: ADDRESS_CONFIG.delaney,
        abi: delaneyAbi,
        functionName: 'delegate',
        args: [BigInt((Number(userInput) * 1000000)), 0, parseInt(new Date().getTime() / 1000) + 10 * 60]
      });
      setBtnLoading(true);
    } else {
      // 授权
      try {
        await writeContractAllow({
          address: ADDRESS_CONFIG.mud,
          abi: erc20Abi,
          functionName: 'approve',
          args: [ADDRESS_CONFIG.delaney, 100000000000000n]
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          content: '授权失败'
        });
      }
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
            <div className="text-sm">{divideByMillionAndRound(delegateUser?.usdt || 0)} USDT</div>
            <div className="text-xs text-[#989898]">≈{divideByMillionAndRound(delegateUser?.mud || 0)} MUD</div>
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
          <div className="text-sm">{divideByMillionAndRound(configData?.[13] || 0)} USDT</div>
          <div className="text-xs text-[#989898]">≈ {mudMax} MUD</div>
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
      <div className="flex justify-between mt-4 relative top-[-10px]">
        <span className="text-xs">质押价值</span>
        <span className="text-xs text-[#FF3F3F]">≈ {divideByMillionAndRound(Number(userInput) * Number(mudPrice))} USDT</span>
      </div>
      <div className="mt-4">
        <Button loading={btnLoading} disabled={!userInput} className="w-full" color="primary" onClick={handleDelegate}>
          {isAllow ? '质押' : '授权'}
        </Button>
      </div>
    </div>
  );
};
