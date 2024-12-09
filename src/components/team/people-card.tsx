import { divideByMillionAndRound, formatAddressString } from '../../utils/tools';
import JazziconAvatar from '../avatar';
import { Rating, ThinRoundedStar } from '@smastrom/react-rating';
import copyIcon from '../../assets/copy.svg';
import copy from 'copy-to-clipboard';
import { Toast } from 'antd-mobile';

export const PeopleCard = ({ info, depth }: { info: any; depth: any }) => {
  const handleCopy = (text: string) => {
    copy(text);
    Toast.show('复制成功');
  };
  
  return (
    <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl mt-3 relative overflow-hidden">
      <div className="flex items-center">
        <JazziconAvatar address={info?.address} diameter={12} />
        <div>
          <span className="ml-3 text-sm flex items-center">{formatAddressString(info?.address)}
            <img onClick={() => handleCopy(info?.address)} className="ml-1" src={copyIcon} alt="" /></span>
          <div className="ml-3 text-sm flex items-center mt-2">邀请码: {info?.ref}
            <img onClick={() => handleCopy(info?.ref)} className="ml-1" src={copyIcon} alt="" /></div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">质押</span>
          <div className="text-right">
            <div className="text-sm">{divideByMillionAndRound(info?.usdt)} USDT</div>
            <div className="text-xs text-[#46D69C]">{divideByMillionAndRound(info?.mud)} MUD</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">星级</span>
          <div className="text-right">
            <Rating
              className="w-24 ml-1 relative"
              value={info?.min_star > info?.star ? info?.min_star : info?.star}
              readOnly
                itemStyles={{
                  itemShapes: ThinRoundedStar,
                  activeFillColor: '#FEC533',
                  inactiveFillColor: '#F3F3F3'
                }}
              />
          </div>
        </div>
        <div className="flex justify-between items-center absolute top-0 right-0 bg-[#46D69C1A] py-1.5 px-5 rounded-bl-2xl">
          <span className="text-[#46D69C] text-sm">第 {(info?.depth || 0) - depth} 代</span>
        </div>
        {/* <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">直推质押</span>
          <div className="text-right">
            <div className="text-sm">{divideByMillionAndRound(info?.sub_usdt)} USDT</div>
            <div className="text-xs text-[#989898]">{divideByMillionAndRound(info?.sub_mud)} MUD</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">团队质押</span>
          <div className="text-right">
            <div className="text-sm">{divideByMillionAndRound(info?.team_usdt)} USDT</div>
            <div className="text-xs text-[#989898]">{divideByMillionAndRound(info?.team_mud)} MUD</div>
          </div>
        </div>
        <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-4"></div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">直推人数</span>
          <div className="text-right">
            <div className="text-sm">{info?.sub_person}</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">团队人数</span>
          <div className="text-right">
            <div className="text-sm">{info?.team_person}</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">注册时间</span>
          <div className="text-right">
            <div className="text-sm">{dayjs.unix(info?.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
