import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { getUserNoToast } from '../../utils/api';
import { authorizationCheck, setCurrentAddress, currentAddress } from '../../utils/tools';

export const VerifyLayout = () => {
  const { isConnected, address, chainId } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 这里只解决跳转链接的问题
    const authCheck = async () => {
      let useIsExist = false;
      let valid = false;

      try {
        // 如果没有连接钱包或者钱包连接错误，通通跳转到连接钱包页面
        if (!isConnected || !address || chainId !== Number(import.meta.env.VITE_APP_CHAIN_ID)) {
          navigate('/connect');
          return;
        }

        const res = await getUserNoToast({ address });
        useIsExist = !!res.data.data;
        valid = await authorizationCheck(address);
        if (useIsExist) {
          if (valid) {
            if (location.pathname === '/connect' || location.pathname === '/bind') {
              navigate('/');
            }
          } else {
            navigate('/connect');
          }
        } else {
          navigate('/bind');
        }
      } catch (error) {
        console.log(error);
        navigate(useIsExist ? '/connect' : '/bind');
      }
      console.log('verify layout ' + new Date().getTime(), { isConnected, address, chainId, valid, useIsExist, currentAddress: currentAddress() });
      if (address !== currentAddress()) {
        navigate('/connect');
        return;
      }
    };
    if (address) {
      setCurrentAddress(address);
    }
    authCheck();
  }, [isConnected, address, chainId]);

  return <Outlet />;
};
