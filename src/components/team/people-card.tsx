import { toSvg } from 'jdenticon';
import { divideByMillionAndRound, formatAddressString } from '../../utils/tools';
import dayjs from 'dayjs';

export const PeopleCard = ({ info }: { info: any }) => {
  console.log(info);
  return (
    <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl mt-3">
      <div className="flex items-center">
        <img className="w-12 h-12 rounded-[50%]" src={`data:image/svg+xml;utf8,${encodeURIComponent(toSvg(info?.address, 200))}`} alt="" />
        <span className="ml-3 text-sm">{formatAddressString(info?.address)}</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">质押</span>
          <div className="text-right">
            <div className="text-sm">{divideByMillionAndRound(info?.usdt)} USDT</div>
            <div className="text-xs text-[#989898]">{divideByMillionAndRound(info?.mud)} MUD</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">直推人数</span>
          <div className="text-right">
            <div className="text-sm">{info?.sub_person}</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">直推质押</span>
          <div className="text-right">
            <div className="text-sm">{divideByMillionAndRound(info?.sub_usdt)} USDT</div>
            <div className="text-xs text-[#989898]">{divideByMillionAndRound(info?.sub_mud)} MUD</div>
          </div>
        </div>
        <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-4"></div>
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">团队质押</span>
          <div className="text-right">
            <div className="text-sm">{divideByMillionAndRound(info?.team_usdt)} USDT</div>
            <div className="text-xs text-[#989898]">{divideByMillionAndRound(info?.team_mud)} MUD</div>
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
        </div>
      </div>
    </div>
  );
};
