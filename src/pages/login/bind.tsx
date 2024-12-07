import { Button, Modal, PasscodeInput } from 'antd-mobile';
import colorBg from '../../assets/color-bg.png';
import logo from '../../assets/logo.svg';
import { useAccount, useSignMessage } from 'wagmi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, getUserNoToast } from '../../utils/api';
import { formatAddressString } from '../../utils/tools';
import { ExclamationCircleFill } from 'antd-mobile-icons';

export const Bind = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const { isConnected, address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    if (chainId !== Number(import.meta.env.VITE_APP_CHAIN_ID)) {
      navigate('/');
      return;
    }
    if (isConnected && address) {
      if (localStorage.getItem(address + 'sign')) {
        getUserNoToast({ address }).then((res) => {
          if (res.data.data) {
            navigate('/home');
          }
        });
      } else {
        console.log('sign2.....');
        signMessageAsync({ message: 'verify your account' })
          .then((data) => {
            localStorage.setItem(address + 'sign', data);
            navigate('/home');
          })
          .catch(() => {
            navigate('/');
          });
      }
    } else {
      navigate('/');
    }
  }, [isConnected, address, chainId]);

  const handleToLink = () => {
    navigate('/');
  };

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleConfirm = () => {
    if (address) {
      setLoading(true);
      createUser({
        address: address,
        parent_ref: value
      })
        .then(() => {
          setLoading(false);
          navigate('/home');
        })
        .catch(() => {
          Modal.alert({
            header: (
              <ExclamationCircleFill
                style={{
                  fontSize: 50,
                  color: 'var(--adm-color-warning)'
                }}
              />
            ),
            title: '注意',
            content: '邀请码错误'
          });
          setValue('');
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <img className="w-screen absolute left-0 top-0" src={colorBg} alt="背景" />
        <div className="relative z-10 w-full flex justify-center pt-24">
          <div className="flex flex-wrap justify-center">
            <img src={logo} className="text-center" alt="" />
            <span className="w-full text-center font-normal text-xl">Delaney</span>
          </div>
        </div>
        <div className="mt-10 text-xl text-center font-semibold">请输入您的邀请码</div>
        <div className="flex justify-center mt-6">
          <PasscodeInput value={value} plain seperated onChange={handleChange} />
        </div>
        <div className="mt-3 text-center text-base">
          你的钱包地址
          <span className="text-[#2A66FF]" onClick={handleToLink}>
            {formatAddressString(address as string)}
          </span>
        </div>
        <div className="flex justify-center w-screen absolute bottom-20">
          <Button onClick={handleConfirm} loading={loading} disabled={value.length !== 6} color="primary" className="w-80 h-11 rounded-xl text-xl">
            确认
          </Button>
        </div>
      </div>
    </>
  );
};
