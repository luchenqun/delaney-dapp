import { Badge, Toast } from 'antd-mobile';
import logo from '../../assets/logo.svg';
import bell from '../../assets/bell.svg';
import { useAccount } from 'wagmi';
import { divideByMillionAndRound, formatAddressString, getAddressUrl } from '../../utils/tools';
import { useNavigate } from 'react-router-dom';
import copyIcon from '../../assets/copy.svg';
import copy from 'copy-to-clipboard';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { getHasUnreadMessage } from '../../utils/api';
import { useMudPrice } from '../../hook/useMudPrice';

export const HomeHeaders = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [messageUnread, setMessageUnread] = useState(false);
  const { price } = useMudPrice();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      hasUnreadMessage(address);
    }
  }));

  const handleCopy = () => {
    copy(address as string);
    Toast.show({
      content: '复制成功'
    });
  };

  useEffect(() => {
    hasUnreadMessage(address);
  }, [address]);

  const hasUnreadMessage = async (address: string | undefined) => {
    if (address) {
      getHasUnreadMessage({ address }).then((res) => {
        setMessageUnread(res.data.data.has_unread);
      });
    }
  };

  const handleShowVConsole = () => {
    new (window as any).VConsole();
  };

  return (
    <div className="header-bg px-4 py-1 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="flex">
        <img onClick={handleShowVConsole} className="w-10 h-10" src={logo} alt="logo" />
        <div className="ml-3">
          <div className="text-base flex items-center">
            <span onClick={() => { window.open(getAddressUrl(address as string), '_blank'); }}>{formatAddressString(address as string)}</span>
            <img onClick={handleCopy} className="ml-1" src={copyIcon} alt="" />
          </div>
          <div className="text-primary text-sm">{price ? `MUD ≈ ${divideByMillionAndRound(price as bigint)} USDT` : '-'}</div>
        </div>
      </div>
      <Badge content={messageUnread ? Badge.dot : ''}>
        <img className="w-6 h-6" src={bell} alt="消息" onClick={() => navigate('/message')} />
      </Badge>
    </div>
  );
});
