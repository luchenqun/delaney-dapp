import { Toast } from 'antd-mobile';
import colorBg from '../../assets/color-bg.png';
import logo from '../../assets/logo.svg';
import wallet from '../../assets/wallet.svg';
import { useAccount, useConnect, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from '../../hook/useAuthCheck';

export const WalletConnect = () => {
  const navigate = useNavigate();
  const { switchChain } = useSwitchChain();
  const { connect, isError, isSuccess } = useConnect();
  const { isConnected, address, chainId } = useAccount();
  const [isVerifying, setIsVerifying] = useState(false);
  const { verifyWallet: authCheck } = useAuthCheck();

  // 连接处理
  const handleConnect = async () => {
    if (!isConnected) {
      connect({ connector: injected() });
      return;
    }

    if (chainId !== Number(import.meta.env.VITE_APP_CHAIN_ID)) {
      switchChain({ chainId: Number(import.meta.env.VITE_APP_CHAIN_ID) });
      return;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      Toast.show({ content: '钱包连接成功' });
      navigate('/bind');
    }
    if (isError) {
      Toast.show({ content: '钱包连接失败，请重试' });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    const verifyUser = async () => {
      if (isVerifying) return;
      setIsVerifying(true);
      await authCheck(isConnected, address, chainId);
      setIsVerifying(false);
    };

    verifyUser();
  }, [isConnected, chainId, address]);

  // 按钮文案逻辑
  const getButtonText = () => {
    if (chainId !== Number(import.meta.env.VITE_APP_CHAIN_ID)) return '切换网络';
    if (!isConnected) return '连接钱包';
    if (isVerifying) return '验证中...';
    return '连接钱包';
  };

  return (
    <>
      <div className="min-h-screen">
        <img className="w-screen absolute left-0 top-0" src={colorBg} alt="背景" />
        <div className="relative z-10 w-full flex justify-center pt-24">
          <div className="flex flex-wrap justify-center">
            <img src={logo} className="text-center" alt="" />
            <span className="w-full text-center font-normal text-xl">Delaney</span>
          </div>
        </div>
        <img className="mx-auto mt-12" src={wallet} alt="" />
        <div className="flex justify-center w-screen absolute bottom-20 flex-wrap">
          <div onClick={handleConnect} className="flex justify-center items-center font-bold w-80 text-xl h-11 rounded-xl bg-[#46D69C] mt-4">
            {getButtonText()}
          </div>
        </div>
      </div>
    </>
  );
};
