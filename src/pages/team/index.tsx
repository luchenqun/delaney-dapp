import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { NavBar } from "antd-mobile";
import { PeopleCard } from "../../components/team/people-card";

export const Team = () => {
  return (
    <>
      <NavBar back={null}>我的团队</NavBar>
      <div className="bg-[#F5F5F5] min-h-screen pt-3">
        <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
          <div className="flex justify-between items-center">
            <span className="text-[#989898] text-sm">我的星级</span>
            <div>
              <Rating
                className="w-24 ml-1 relative"
                value={3}
                readOnly
                itemStyles={{
                  itemShapes: ThinRoundedStar,
                  activeFillColor: "#FEC533",
                  inactiveFillColor: "#F3F3F3",
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[#989898] text-sm">直推质押</span>
            <div className="text-right">
                <div className="font-semibold text-sm">120 USDT</div>
                <div className="text-xs">≈350 MUD</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[#989898] text-sm">直推人数</span>
            <div>
                <div className="font-semibold text-sm">120</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[#989898] text-sm">团队质押</span>
            <div className="text-right">
                <div className="font-semibold text-sm">120 USDT</div>
                <div className="text-xs">≈350 MUD</div>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-6 font-semibold text-base">直推人员列表</div>
        <PeopleCard />
      </div>
    </>
  );
};
