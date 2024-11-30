import headImg from "../../assets/headImg.png";

export const PeopleCard = () => {
  return (
    <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl mt-3">
      <div className="flex items-center">
        <img className="w-12 h-12 rounded-[50%]" src={headImg} alt="" />
        <span className="ml-3 text-sm">dsadvcdsdfdsd</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">质押</span>
          <div className="text-right">
            <div className="text-sm">120USDT</div>
            <div className="text-xs text-[#989898]">350MUD</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">直推人数</span>
          <div className="text-right">
            <div className="text-sm">120</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">直推质押</span>
          <div className="text-right">
            <div className="text-sm">120USDT</div>
            <div className="text-xs text-[#989898]">350MUD</div>
          </div>
        </div>
        <div className="bg-[#F0F0F0] h-[1px] w-full mt-4 mb-4"></div>
        <div className="flex justify-between items-center">
          <span className="text-[#989898] text-sm">团队质押</span>
          <div className="text-right">
            <div className="text-sm">120USDT</div>
            <div className="text-xs text-[#989898]">350MUD</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">团队人数</span>
          <div className="text-right">
            <div className="text-sm">120</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#989898] text-sm">注册时间</span>
          <div className="text-right">
            <div className="text-sm">2021-07-06  14:19:04</div>
          </div>
        </div>
      </div>
    </div>
  );
};
