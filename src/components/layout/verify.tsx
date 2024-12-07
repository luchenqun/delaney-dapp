import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useAuthCheck } from '../../hook/useAuthCheck';

export const VerifyLayout = () => {
  console.log('<==============================> VerifyLayout');

  const { isConnected, address, chainId } = useAccount();
  const { verifyWallet } = useAuthCheck();

  useEffect(() => {
    verifyWallet(isConnected, address, chainId);
  }, [isConnected, address, chainId]);

  return <Outlet />;
};
