import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

export const LoginLayout = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected]);

  return <Outlet />;
};
