import { Button, Modal, PasscodeInput, Toast } from 'antd-mobile';
import colorBg from '../../assets/color-bg.png';
import logo from '../../assets/logo.svg';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, getUserNoToast, getUsers } from '../../utils/api';
import { formatAddressString, getAddressUrl } from '../../utils/tools';
import { ExclamationCircleFill } from 'antd-mobile-icons';
import copyIcon from '../../assets/copy.svg';
import copy from 'copy-to-clipboard';

export const Bind = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const { isConnected, address, chainId } = useAccount();
  const [pageHeight, setPageHeight] = useState(0);
  const [refAddress, setRefAddress] = useState('');

  useEffect(() => {
    if (address) {
      getUserNoToast({ address }).then((res) => {
        if (res.data.data) {
          navigate('/');
        } else {
          navigate('/bind');
        }
      });
    } else {
      navigate('/bind');
    }
  }, [isConnected, address, chainId]);

  const handleToLink = () => {
    window.open(getAddressUrl(address as string), '_blank');
  };

  const handleToLinkRef = () => {
    window.open(getAddressUrl(refAddress), '_blank');
  };

  const handleChange = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    if (value.length === 6) {
      handleGetAddress();
    } else {
      setRefAddress('');
    }
  }, [value]);

  const handleGetAddress = () => {
    getUsers({
      filters: {
        ref: `=${value}`
      }
    }).then((res) => {
      if (res.data.data.items.length > 0) {
        setRefAddress(res.data.data.items[0].address);
      } else {
        setRefAddress('none');
      }
    });
  };

  const handleConfirm = () => {
    if (address) {
      setLoading(true);
      createUser({
        address,
        parent_ref: value
      })
        .then(() => {
          setLoading(false);
          navigate('/connect');
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

  useEffect(() => {
    setPageHeight(window.innerHeight);
  }, []);

  const handleShowVConsole = () => {
    (window as any).vConsole.hideSwitch(); // 默认面板我们不显示，只通过点击图片触发
    (window as any).vConsole.show();
  };

  const handleCopy = (text: string) => {
    copy(text);
    Toast.show('复制成功');
  };

  return (
    <>
      <div className="min-h-screen relative" style={{ height: pageHeight }}>
        <img className="w-screen absolute left-0 top-0" src={colorBg} alt="背景" />
        <div className="relative z-10 w-full flex justify-center pt-24">
          <div onClick={handleShowVConsole} className="flex flex-wrap justify-center">
            <img src={logo} className="text-center" alt="" />
            <span className="w-full text-center font-normal text-xl">Delaney</span>
          </div>
        </div>
        <div className="mt-10 text-xl text-center font-semibold">请输入您的邀请码</div>
        <div className="flex justify-center mt-6">
          <PasscodeInput error={refAddress === 'none'} value={value} plain seperated onChange={handleChange} />
        </div>
        <div className="mt-3 text-center text-base">
          {address && (
            <span className="flex items-center justify-center">
              你的钱包地址&nbsp;
              <span className="text-[#2A66FF]" onClick={handleToLink}>
                {formatAddressString(address as string)}
              </span>
              <img
                onClick={() => {
                  handleCopy(address as string);
                }}
                className="ml-1"
                src={copyIcon}
                alt=""
              />
            </span>
          )}
          {refAddress && refAddress !== 'none' && (
            <div className="flex items-center justify-center">
              邀请钱包地址&nbsp;
              <span className="text-[#2A66FF]" onClick={handleToLinkRef}>
                {formatAddressString(refAddress)}
              </span>
              <img
                onClick={() => {
                  handleCopy(refAddress);
                }}
                className="ml-1"
                src={copyIcon}
                alt=""
              />
            </div>
          )}
          {refAddress === 'none' && <div className="flex items-center justify-center">您输入的邀请码不存在</div>}
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
