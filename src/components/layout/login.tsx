import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAccount, useSignMessage } from 'wagmi';
import { getUserNoToast } from '../../utils/api';
import { Toast } from 'antd-mobile';

export const LoginLayout = () => {
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    } else {
      signMessageAsync({ message: "Verify your account" }).then(() => {
        getUserNoToast({ address: address as string })
        .then((res) => {
          if (!res.data.data) {
            Toast.show({
              content: '请先连接钱包'
            });
            navigate('/');
          }
        })
        .catch(() => {
          Toast.show({
            content: '请先连接钱包'
          });
          navigate('/');
        });
      }).catch(() => {
        Toast.show({
          content: '请先连接钱包'
        });
        navigate('/');
      })

    }
  }, [isConnected, address, navigate]);

  return <Outlet />;
};
