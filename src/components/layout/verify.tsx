import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { verifyMessage } from 'viem';
import { getUserNoToast } from '../../utils/api';

export const VerifyLayout = () => {
  console.log('<==============================> VerifyLayout');

  const { isConnected, address, chainId } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    // 这里只解决跳转链接的问题
    const authCheck = async () => {
      const message = 'verify you account';
      try {
        // 如果没有连接钱包或者钱包连接错误，通通跳转到连接钱包页面
        if (!isConnected || !address || chainId !== Number(import.meta.env.VITE_APP_CHAIN_ID)) {
          navigate('/connect');
          return;
        }

        // 连接上了，根据情况跳转到输入邀请码页面或者主页
        const key = address + 'sign';

        const signature =
          (localStorage.getItem(key) as `0x${string}`) ||
          '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c';
        console.log({ signature });

        const res = await getUserNoToast({ address });
        const valid = await verifyMessage({ address, message, signature });
        if (res.data.data) {
          navigate(valid ? '/' : '/connect'); // 签名登录在钱包页面完成
        } else {
          navigate('/bind');
        }
      } catch (error) {
        console.log(error);
        // 出现了错误，要么用户不存在或者取消签名，那么依然要求用户进行登录
        navigate('/bind');
      }
    };

    authCheck();
  }, [isConnected, address, chainId]);

  return <Outlet />;
};
