import { Badge, Toast } from 'antd-mobile';
import logo from '../../assets/logo.svg';
import bell from '../../assets/bell.svg';
import { useAccount, useReadContract } from 'wagmi';
import delaneyAbi from '../../../abi/delaney.json';
import { divideByMillionAndRound, formatAddressString } from '../../utils/tools';
import { useNavigate } from 'react-router-dom';
import copyIcon from '../../assets/copy.svg';
import copy from 'copy-to-clipboard';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { getMessages } from '../../utils/api';

export const HomeHeaders = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [messageUnread, setMessageUnread] = useState(false);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      if (address) {
        getMessageUnread();
        refetch();
      }
    }
  }));

  const { data, refetch } = useReadContract({
    functionName: 'mudPrice',
    abi: delaneyAbi,
    address: import.meta.env.VITE_APP_DELANEY_ADDRESS,
    args: []
  });

  const handleCopy = () => {
    copy(address as string);
    Toast.show({
      content: '复制成功'
    });
  };

  useEffect(() => {
    if (address) {
      getMessageUnread();
    }
  }, [address]);

  const getMessageUnread = async () => {
    getMessages({
      'filters[address]': `='${address?.toLocaleLowerCase()}'`,
      'filters[is_read]': '=false'
    }).then((res) => {
      if (res.data.data.total > 0) {
        setMessageUnread(true);
      } else {
        setMessageUnread(false);
      }
    });
  };

  return (
    <div className="bg-white px-4 py-1 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="flex">
        <img className="w-10 h-10" src={logo} alt="logo" />
        <div className="ml-3">
          <div className="text-base flex items-center">
            {formatAddressString(address as string)}
            <img onClick={handleCopy} className="ml-1" src={copyIcon} alt="" />
          </div>
          <div className="text-primary text-sm">{data ? `MUD ≈ ${divideByMillionAndRound(data as bigint)} USDT` : '-'}</div>
        </div>
      </div>
      <Badge content={messageUnread ? Badge.dot : ''}>
        <img className="w-6 h-6" src={bell} alt="消息" onClick={() => navigate('/message')} />
      </Badge>
    </div>
  );
});
  