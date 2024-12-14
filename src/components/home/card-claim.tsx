import copy from 'copy-to-clipboard';
import { useAccount } from 'wagmi';
import copyIcon from '../../assets/copy.svg';
import { Tag, Toast, Button } from 'antd-mobile';
import { clearClaim } from '../../utils/api';
import { humanReadable, formatAddressString, getTxUrl, afterSeconds, UsdtPrecision } from '../../utils/tools';
import dayjs from 'dayjs';

export const CardClaim = ({ info }: { info: any }) => {
  const { address } = useAccount();

  const handleCopy = () => {
    copy(info.hash);
    Toast.show({
      content: '复制成功'
    });
  };

  const renderStatus = () => {
    if (info.status === 0) {
      return <Tag color="#2db7f5">领取中</Tag>;
    } else if (info.status === 1) {
      return <Tag color="success">已领取</Tag>;
    } else if (info.status === 2) {
      return <Tag color="danger">领取失败</Tag>;
    }
  };
  const handleClearClaim = async () => {
    if (address) {
      await clearClaim({ address });
      window.location.reload();
    }
  };

  return (
    <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">奖励</span>
          <div className="text-right">
            <div className="text-sm">{humanReadable(info.usdt, UsdtPrecision)} USDT</div>
            <div className="text-xs text-[#989898]">{humanReadable(info.mud)} MUD</div>
          </div>
        </div>
        {info.status === 1 && (
          <div className="flex justify-between items-center mt-4">
            <span className="text-[#989898] text-sm">交易哈希</span>
            <div className="text-right">
              <div className="text-sm text-[#2A66FF] flex">
                <a href={getTxUrl(info.hash)} target="_blank">
                  {formatAddressString(info.hash)}
                </a>
                <img onClick={handleCopy} className="ml-1" src={copyIcon} alt="" />
              </div>
            </div>
          </div>
        )}
        {info.status === 1 && (
          <div className="flex justify-between items-center mt-4">
            <span className="text-[#989898] text-sm">领取时间</span>
            <div className="text-right">
              <div className="text-sm">{dayjs.unix(info.claim_time).format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">截止时间</span>
          <div className="text-right">
            <div className="text-sm">{dayjs.unix(info.deadline).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">状态</span>
          <div className="text-right">
            <div className="text-sm">{renderStatus()}</div>
          </div>
        </div>
        {info.status === 0 && info.deadline < afterSeconds(0) && (
          <div className="mt-4">
            <Button className="w-full" color="primary" onClick={handleClearClaim}>
              确认提取失败
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
