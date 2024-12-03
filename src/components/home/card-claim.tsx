import copy from 'copy-to-clipboard';
import copyIcon from '../../assets/copy.svg';
import { Modal, Tag } from 'antd-mobile';
import { divideByMillionAndRound, formatAddressString } from '../../utils/tools';
import dayjs from 'dayjs';

export const CardClaim = ({ info }: { info: any }) => {

  const handleCopy = () => {
    copy(info.hash);
    Modal.alert({
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

  return (
    <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">奖励</span>
          <div className="text-right">
            <div className="text-sm">{divideByMillionAndRound(info.usdt)} USDT</div>
            <div className="text-xs text-[#989898]">{divideByMillionAndRound(info.mud)} MUD</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">交易哈希</span>
          <div className="text-right">
            <div className="text-sm text-[#2A66FF] flex">
              {formatAddressString(info.hash)}
              <img onClick={handleCopy} className="ml-1" src={copyIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">领取时间</span>
          <div className="text-right">
            <div className="text-sm">{dayjs.unix(info.claim_time).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        </div>
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
      </div>
    </div>
  );
};
