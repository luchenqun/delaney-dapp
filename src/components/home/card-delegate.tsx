import copy from 'copy-to-clipboard';
import copyIcon from '../../assets/copy.svg';
import { Button, Modal, Tag, Toast } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { divideByMillionAndRound, formatAddressString, afterSeconds } from '../../utils/tools';
import dayjs from 'dayjs';
import { ADDRESS_CONFIG } from '../../utils/wagmi';
import delaneyAbi from '../../../abi/delaney.json';
import { TxType } from '../../utils/data';

export const CardDelegate = ({ info }: { info: any }) => {
  const { data: hash, writeContract, isPending, isError, status } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const [btnLoading, setBtnLoading] = useState(false);
  const [txType, setTxType] = useState<TxType>(TxType.Approve);

  useEffect(() => {
    if (isPending) {
      setBtnLoading(true);
    }
    if (isError) {
      setBtnLoading(false);
    }
  }, [isPending, isError, status]);

  useEffect(() => {
    if (hash) {
      setBtnLoading(isLoading);
    }
    if (isSuccess) {
      Toast.show({ content: txType == TxType.Undelegate ? '取回成功' : '复投成功' });
      setTimeout(() => {
        // TODO 这里要刷新数据，不要重载页面
        window.location.reload();
      }, 1000);
    }
  }, [isLoading, isSuccess, txType, hash]);

  const handleCopy = () => {
    copy(info.hash);
    Modal.alert({
      content: '复制成功'
    });
  };

  const handleRedelegate = async () => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'redelegate',
      args: [info.cid, afterSeconds(10 * 60)]
    });
    setTxType(TxType.Redelegate);
  };

  const handleUndelegate = async () => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'undelegate',
      args: [info.cid, 0, afterSeconds(10 * 60)]
    });
    setTxType(TxType.Redelegate);
  };

  const renderStatus = () => {
    if (info.status === 0) {
      return <Tag color="#2db7f5">质押中</Tag>;
    } else if (info.status === 1) {
      return <Tag color="success">成功</Tag>;
    } else if (info.status === 2) {
      return <Tag color="danger">失败</Tag>;
    } else if (info.status === 3) {
      return <Tag color="warning">取回中</Tag>;
    } else if (info.status === 4) {
      return <Tag color="default">已取回</Tag>;
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
        {/* <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-4"></div> */}
        {info.status == 4 && (
          <>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[#989898] text-sm">提取MUD</span>
              <div className="text-right">
                <div className="text-sm">{divideByMillionAndRound(info.back_mud)} MUD</div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[#989898] text-sm">提取时间</span>
              <div className="text-right">
                <div className="text-sm">{info.undelegate_time ? dayjs.unix(info.undelegate_time).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">状态</span>
          <div className="text-right">
            <div className="text-sm">{renderStatus()}</div>
          </div>
        </div>
        {info.status == 0 && (
          <div className="mt-6">
            <Button color="primary" className="w-full">
              <span className="text-white mr-1">120天 23小时52分</span>
              <span className="text-sm relative top-[-1px]">可提取</span>
            </Button>
          </div>
        )}
        <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-4"></div>
        <div className="flex gap-4 mt-4">
          <Button loading={btnLoading} className="w-full bg-[#FEC533] h-10 rounded-xl" onClick={handleRedelegate}>
            复投
          </Button>
          <Button loading={btnLoading} className="w-full bg-[#F3F3F3] rounded-xl" onClick={handleUndelegate}>
            提取
          </Button>
        </div>
      </div>
    </div>
  );
};
