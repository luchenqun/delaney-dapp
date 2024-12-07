import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useWalletVerify } from '../../hook/useWalletVerify';

export const VerifyLayout = () => {
  const { isConnected, address, chainId } = useAccount();
  const { verifyWallet } = useWalletVerify();

  useEffect(() => {
    verifyWallet(isConnected, address, chainId);
  }, [isConnected, address, chainId]);

  return <Outlet />;
};
