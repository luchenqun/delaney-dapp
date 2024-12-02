import copy from 'copy-to-clipboard';
import copyIcon from '../../assets/copy.svg';
import { Button, Modal, Tag } from 'antd-mobile';

export const CardDelegate = () => {
  const handleCopy = () => {
    copy('Text');
    Modal.alert({
      content: '复制成功'
    });
  };

  return (
    <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl mt-3">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">质押数量</span>
          <div className="text-right">
            <div className="text-sm">120USDT</div>
            <div className="text-xs text-[#989898]">350MUD</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">质押哈希</span>
          <div className="text-right">
            <div className="text-sm text-[#2A66FF] flex">
              125d4decaf5929f64...dada
              <img onClick={handleCopy} className="ml-1" src={copyIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">质押时间</span>
          <div className="text-right">
            <div className="text-sm">2021-07-06 14:19:04</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">解锁时间</span>
          <div className="text-right">
            <div className="text-sm">2021-07-06 14:19:04</div>
          </div>
        </div>
        <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-4"></div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">提取MUD</span>
          <div className="text-right">
            <div className="text-sm">120MUD</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">提取时间</span>
          <div className="text-right">
            <div className="text-sm">2021-07-06 14:19:04</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">状态</span>
          <div className="text-right">
            <div className="text-sm">
              <Tag color="#277DFF">质押中</Tag>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button color="primary" className="w-full">
            <span className="text-white mr-1">120天 23小时52分</span>
            <span className="text-sm relative top-[-1px]">可提取</span>
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <Button className="w-full bg-[#F3F3F3] rounded-xl">提取</Button>
          <Button className="w-full bg-[#FEC533] h-10 rounded-xl">复投</Button>
        </div>
      </div>
    </div>
  );
};
