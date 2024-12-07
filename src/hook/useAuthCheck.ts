import { useNavigate } from 'react-router-dom';
import { useSignMessage } from 'wagmi';
import { getUserNoToast } from '../utils/api';
import { Toast } from 'antd-mobile';

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const { signMessageAsync } = useSignMessage();

  const authCheck = async (isConnected: boolean, address: string | undefined, chainId?: number) => {
    if (!isConnected || !address || chainId !== Number(import.meta.env.VITE_APP_CHAIN_ID)) {
      navigate('/');
      return false;
    }

    // 检查签名
    const signature = localStorage.getItem(address + 'sign');
    if (signature) {
      try {
        const res = await getUserNoToast({ address });
        if (res.data.data) {
          navigate('/home');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        Toast.show({ content: '验证失败，请重试' });
        navigate('/login');
      }
    } else {
      try {
        const signature = await signMessageAsync({ message: 'verify your account' });
        localStorage.setItem(address + 'sign', signature);
        const res = await getUserNoToast({ address });
        if (res.data.data) {
          navigate('/home');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    }
    return true;
  };

  return { verifyWallet: authCheck };
};