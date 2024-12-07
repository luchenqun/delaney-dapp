import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useWalletVerify } from '../../hook/useWalletVerify';

export const LoginLayout = () => {
  const { isConnected, address, chainId } = useAccount();
  const navigate = useNavigate();
  const { verifyWallet } = useWalletVerify();

  useEffect(() => {
    const verifyUser = async () => {
      if (!isConnected) {
        navigate('/');
        return;
      }

      if (localStorage.getItem(address + 'sign')) {
        await verifyWallet(address as string, chainId);
      } else {
        navigate('/');
      }
    };

    verifyUser();
  }, [isConnected, address, chainId]);

  return <Outlet />;
};
