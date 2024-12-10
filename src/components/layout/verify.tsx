import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { getUserNoToast } from '../../utils/api';
import { authorizationCheck, setCurrentAddress, currentAddress } from '../../utils/tools';

export const VerifyLayout = () => {
  const { isConnected, address, chainId } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    // 这里只解决跳转链接的问题
    const authCheck = async () => {
      let useIsExist = false;
      let valid = false;
      try {
        // 如果没有连接钱包或者钱包连接错误，通通跳转到连接钱包页面
        if (!isConnected || !address || chainId !== Number(import.meta.env.VITE_APP_CHAIN_ID) || address !== currentAddress()) {
          navigate('/connect');
          return;
        }

        const res = await getUserNoToast({ address });
        useIsExist = !!res.data.data;
        valid = await authorizationCheck(address);
        if (useIsExist) {
          navigate(valid ? '/' : '/connect'); // 签名登录在钱包页面完成
        } else {
          navigate('/bind');
        }
      } catch (error) {
        console.log(error);
        navigate(useIsExist ? '/connect' : '/bind');
      }
      console.log('verify layout ' + new Date().getTime(), { isConnected, address, chainId, valid, useIsExist });
    };
    console.log('verify layout address ' + address);
    if (address) {
      setCurrentAddress(address);
    }
    authCheck();
  }, [isConnected, address, chainId]);

  return <Outlet />;
};
