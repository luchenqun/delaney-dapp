import { Button, PasscodeInput } from 'antd-mobile';
import colorBg from '../../assets/color-bg.png';
import logo from '../../assets/logo.svg';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, getUser } from '../../utils/api';

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      getUser({ address }).then((res) => {
        if (res.data.data) {
          navigate('/home');
        }
      });
      return;
    } else {
      navigate('/');
    }
  }, [isConnected]);

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
        })
        .catch(() => {
          navigate('/');
        });
    }
  };

  return (
    <>
      <div>
        <img className="w-screen absolute left-0 top-0" src={colorBg} alt="背景" />
        <div className="relative z-10 w-full flex justify-center pt-24">
          <div className="flex flex-wrap justify-center">
            <img src={logo} className="text-center" alt="" />
            <span className="w-full text-center font-normal text-xl">Delaney</span>
          </div>
        </div>
        <div className="mt-10 text-xl text-center font-semibold">请输入您的邀请码</div>
        <div className="flex justify-center mt-6">
          <PasscodeInput plain seperated onChange={handleChange} />
        </div>
        {/* <div className="mt-3 text-center text-base">
          请先{' '}
          <span className="text-[#2A66FF]" onClick={handleToLink}>
            连接钱包
          </span>{' '}
          以绑定邀请码
        </div> */}
        <div className="flex justify-center w-screen absolute bottom-20">
          <Button onClick={handleConfirm} loading={loading} disabled={value.length !== 6} color="primary" className="w-80 h-11 rounded-xl text-xl">
            确认
          </Button>
        </div>
      </div>
    </>
  );
};
