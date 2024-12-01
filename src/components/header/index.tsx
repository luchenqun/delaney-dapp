import { Badge } from 'antd-mobile';
import logo from '../../assets/logo.svg';
import bell from '../../assets/bell.svg';
import { useAccount, useReadContract } from 'wagmi';
import delaneyAbi from '../../../abi/delaney.json';
import { divideByMillionAndRound } from '../../utils/tools';

export const HomeHeaders = () => {
  const { data } = useReadContract({
    functionName: 'mudPrice',
    abi: delaneyAbi,
    address: import.meta.env.VITE_APP_DELANEY_ADDRESS,
    args: []
  });

  return (
    <div className="bg-white px-4 py-1 flex justify-between items-center">
      <div className="flex">
        <img className="w-10 h-10" src={logo} alt="logo" />
        <div className="ml-3">
          <div className="text-base">Delaney</div>
          <div className="text-primary text-sm">{data ? `MUD ≈ ${divideByMillionAndRound(data as bigint)} USDT` : '-'}</div>
        </div>
      </div>
      <Badge content={Badge.dot}>
        <img className="w-6 h-6" src={bell} alt="消息" />
      </Badge>
    </div>
  );
};
