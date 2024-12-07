import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { getUserNoToast } from '../../utils/api';
import { Toast } from 'antd-mobile';

export const LoginLayout = () => {
  const { isConnected, address, chainId } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    } else {
      if (localStorage.getItem(address + 'sign')) {
        getUserNoToast({ address: address as string }).then((res) => {
          if (!res.data.data) {
            Toast.show({ content: '请先连接钱包' });
            navigate('/');
          }
        });
      } else {
        navigate('/');
      }
    }
  }, [isConnected, address, navigate]);

  useEffect(() => {
    const id = import.meta.env.VITE_APP_CHAIN_ID;
    if (chainId !== Number(id)) {
      Toast.show({
        content: '请切换到主网',
        afterClose: () => {
          navigate('/');
        }
      });
    }
  }, [chainId]);

  return <Outlet />;
};
