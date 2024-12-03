import copy from 'copy-to-clipboard';
import copyIcon from '../../assets/copy.svg';
import { Button, Modal, Tag } from 'antd-mobile';
import { divideByMillionAndRound, formatAddressString } from '../../utils/tools';
import dayjs from 'dayjs';

export const CardDelegate = ({ info }: { info: any }) => {
  const handleCopy = () => {
    copy(info.hash);
    Modal.alert({
      content: '复制成功'
    });
  };

  const renderStatus = () => {
    if (info.status === 0) {
      return <Tag color="#2db7f5">质押中</Tag>;
    } else if (info.status === 1) {
      return <Tag color="success">成功</Tag>;
    } else if (info.status === 2) {
      return <Tag color="danger">失败</Tag>;
    } else if (info.status === 3) {
      return <Tag color="warning">取消质押中</Tag>;
    } else if (info.status === 4) {
      return <Tag color="default">已取消质押</Tag>;
    }
  };

  return (
    <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">质押数量</span>
          <div className="text-right">
            <div className="text-sm">{divideByMillionAndRound(info.usdt)} USDT</div>
            <div className="text-xs text-[#989898]">{divideByMillionAndRound(info.mud)} MUD</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">质押哈希</span>
          <div className="text-right">
            <div className="text-sm text-[#2A66FF] flex">
              {formatAddressString(info.hash)}
              <img onClick={handleCopy} className="ml-1" src={copyIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">质押时间</span>
          <div className="text-right">
            <div className="text-sm">{dayjs.unix(info.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">解锁时间</span>
          <div className="text-right">
            <div className="text-sm">{dayjs.unix(info.unlock_time).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        </div>
        <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-4"></div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">提取MUD</span>
          <div className="text-right">
            <div className="text-sm">{divideByMillionAndRound(info.back_mud)} MUD</div>
          </div>
        </div>
        {info.status == 4 && (
          <>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[#989898] text-sm">提取时间</span>
              <div className="text-right">
                <div className="text-sm">{info.undelegate_time ? dayjs.unix(info.undelegate_time).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[#989898] text-sm">状态</span>
              <div className="text-right">
                <div className="text-sm">{renderStatus()}</div>
              </div>
            </div>
          </>
        )}
        {info.status == 0 && (
          <div className="mt-6">
            <Button color="primary" className="w-full">
              <span className="text-white mr-1">120天 23小时52分</span>
              <span className="text-sm relative top-[-1px]">可提取</span>
            </Button>
          </div>
        )}
        <div className="flex gap-4 mt-4">
          <Button className="w-full bg-[#F3F3F3] rounded-xl">提取</Button>
          <Button className="w-full bg-[#FEC533] h-10 rounded-xl">复投</Button>
        </div>
      </div>
    </div>
  );
};
