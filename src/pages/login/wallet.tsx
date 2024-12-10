import { Toast } from 'antd-mobile';
import colorBg from '../../assets/color-bg.png';
import logo from '../../assets/logo.svg';
import wallet from '../../assets/wallet.svg';
import { formatAddressString } from '../../utils/tools';
import { authorizationSignMessage, setAuthorizationValue, authorizationCheck } from '../../utils/tools';
import { useAccount, useConnect, useSwitchChain, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const enum ActionType {
  Connect = 0,
  Switch = 1,
  Sign = 2
}

const message = authorizationSignMessage();

export const WalletConnect = () => {
  const navigate = useNavigate();
  const { connect, isError: isErrorConnect, isSuccess: isSuccessConnect } = useConnect();
  const { switchChain, isError: isErrorSwitchChain, isSuccess: isSuccessSwitchChain } = useSwitchChain();
  const { signMessage, data: signature, isError: isErrorSignMessage, isSuccess: isSuccessSignMessage } = useSignMessage();
  const { isConnected, address, chainId } = useAccount();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(ActionType.Connect);
  const [actionText, setActionText] = useState('连接钱包');
  const [pageHeight, setPageHeight] = useState(0);

  // 连接处理
  const handleConnect = async () => {
    setLoading(true);
    if (action === ActionType.Connect) {
      connect({ connector: injected() });
    } else if (action === ActionType.Switch) {
      switchChain({ chainId: Number(import.meta.env.VITE_APP_CHAIN_ID) });
    } else {
      signMessage({ message });
    }
  };

  useEffect(() => {
    if (isSuccessSwitchChain) {
      Toast.show({ content: '钱包连接成功' });
    }
    if (isErrorSwitchChain) {
      Toast.show({ content: '钱包连接失败，请重试' });
    }
    if (isSuccessSwitchChain) {
      Toast.show({ content: '切换链成功' });
    }
    if (isErrorSwitchChain) {
      Toast.show({ content: '切换链失败，请重试' });
    }

    if (isSuccessSignMessage && address && signature) {
      setAuthorizationValue(address, message, signature);
      navigate('/bind'); // 签完名任务完成，给到bind页面判断用户是否需要绑定邀请码或者直接登录
    }

    setLoading(false);
  }, [isSuccessSwitchChain, isErrorSwitchChain, isErrorConnect, isSuccessConnect, isErrorSignMessage, isSuccessSignMessage]);

  useEffect(() => {
    console.log('wallet --------->', { isConnected, chainId, address });
    if (!isConnected || !address) {
      setAction(ActionType.Connect);
      return;
    }

    if (chainId !== Number(import.meta.env.VITE_APP_CHAIN_ID)) {
      setAction(ActionType.Switch);
      return;
    }

    authorizationCheck(address)
      .then((valid) => {
        console.log('authorizationCheck is valid', valid);
        if (valid) {
          navigate('/');
        } else {
          setAction(ActionType.Sign);
        }
      })
      .catch((err) => {
        console.log('authorizationCheck error', err);
        setAction(ActionType.Sign);
      });
  }, [isConnected, chainId, address]);

  useEffect(() => {
    if (loading) {
      setActionText('处理中...');
      return;
    }
    if (action == ActionType.Connect) setActionText('连接钱包');
    if (action == ActionType.Switch) setActionText('切换网络');
    if (action == ActionType.Sign) setActionText('登录');
  }, [action]);

  useEffect(() => {
    setPageHeight(window.innerHeight);
  }, []);

  return (
    <>
      <div className="min-h-screen relative" style={{ height: pageHeight }}>
        <img className="w-screen absolute left-0 top-0" src={colorBg} alt="背景" />
        <div className="relative z-10 w-full flex justify-center pt-24">
          <div className="flex flex-wrap justify-center">
            <img src={logo} className="text-center" alt="" />
            <span className="w-full text-center font-normal text-xl">Delaney</span>
          </div>
        </div>
        <img className="mx-auto mt-12" src={wallet} alt="" />
        <div className="mt-3 text-center text-base">
          你的钱包地址&nbsp;
          <span className="text-[#2A66FF]">{formatAddressString(address as string)}</span>
        </div>
        <div className="flex justify-center w-screen absolute bottom-20 flex-wrap">
          <div onClick={handleConnect} className="flex justify-center items-center font-bold w-80 text-xl h-11 rounded-xl bg-[#46D69C] mt-4">
            {actionText}
          </div>
        </div>
      </div>
    </>
  );
};
