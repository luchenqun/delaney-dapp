import { Modal } from 'antd-mobile';
import colorBg from '../../assets/color-bg.png';
import logo from '../../assets/logo.svg';
import wallet from '../../assets/wallet.svg';
import { useAccount, useConnect, useSignMessage, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserNoToast } from '../../utils/api';

export const WalletConnect = () => {
  const navigate = useNavigate();
  const { switchChain } = useSwitchChain();
  const { connect, isError, isSuccess } = useConnect();
  const { isConnected, address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isChangeChain, setIsChangeChain] = useState(false);

  const handleConnect = () => {
    if (isChangeChain) {
      switchChain({ chainId: Number(import.meta.env.VITE_APP_CHAIN_ID )});
      return;
    }
    connect({ connector: injected() });
  };

  useEffect(() => {
    if (isSuccess) {
      Modal.alert({
        content: '钱包连接成功'
      });
      navigate('/login');
    }
    if (isError) {
      // 连接失败的处理
      Modal.alert({
        content: '钱包连接失败，请重试'
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (chainId !== Number(import.meta.env.VITE_APP_CHAIN_ID)) {
      setIsChangeChain(true);
      return;
    }
    if (isConnected && address) {
      if (localStorage.getItem(address + 'sign')) {
        getUserNoToast({ address }).then((res) => {
          if (res.data.data) {
            navigate('/home');
          }
        });
      } else {
        console.log('sign.....');
        signMessageAsync({ message: 'verify your account' })
          .then((data) => {
            localStorage.setItem(address + 'sign', data);
            navigate('/home');
          })
          .catch(() => {
            navigate('/');
          });
      }
    }
  }, [isConnected, chainId]);

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
          {/* <div className="mt-3 text-center text-base">
            请先 <span className="text-[#2A66FF]">连接钱包</span> 以绑定邀请码
          </div> */}
          <div onClick={handleConnect} className="flex justify-center items-center font-bold w-80 text-xl h-11 rounded-xl bg-[#46D69C] mt-4">
            {isChangeChain ? `切换网络` : `连接钱包`}
          </div>
        </div>
      </div>
    </>
  );
};
