import copy from 'copy-to-clipboard';
import copyIcon from '../../assets/copy.svg';
import { Tag, Toast } from 'antd-mobile';
import { humanReadable, formatAddressString, getTxUrl, UsdtPrecision } from '../../utils/tools';
import dayjs from 'dayjs';

export const BenifitCard = ({ info }: { info: any }) => {
  const handleCopy = () => {
    copy(info?.hash);
    Toast.show({
      content: '复制成功'
    });
  };

  const renderStaus = (status: number) => {
    if (status === 0) {
      return <Tag color="danger">未领取</Tag>;
    } else if (status === 1) {
      return <Tag color="warning">领取中</Tag>;
    } else if (status === 2) {
      return <Tag color="success">已领取</Tag>;
    }
  };

  return (
    <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">收益</span>
          <div className="text-right">
            <div className="text-sm">{humanReadable(info?.usdt, UsdtPrecision)} USDT</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">期数</span>
          <div className="text-right">
            <div className="text-sm">第{info?.period}期</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">质押时间</span>
          <div className="text-right">
            <div className="text-sm">{info?.delegate_time ? dayjs.unix(info?.delegate_time).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">解锁时间</span>
          <div className="text-right">
            <div className="text-sm">{dayjs.unix(info?.unlock_time).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        </div>
        <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-4"></div>
        {info.status == 2 && (
          <>
            <div className="flex justify-between items-center">
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
            <div className="flex justify-between items-center mt-4">
              <span className="text-[#989898] text-sm">领取时间</span>
              <div className="text-right">
                <div className="text-sm">{info?.claim_time ? dayjs.unix(info?.claim_time).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">状态</span>
          <div className="text-right">
            <div className="text-sm">{renderStaus(info?.status)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
