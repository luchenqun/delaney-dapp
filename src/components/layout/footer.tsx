import benfit from '../../assets/icon/benfit.svg'
import home from '../../assets/icon/home.svg'
import team from '../../assets/icon/team.svg'

export const Footer = () => {
  return (
    <div className="h-12 text-[#9CA8BA] bg-white fixed bottom-0 left-0 w-screen shadow flex justify-around items-center">
      <div>
        <img src={home} alt="" />
        <div>首页</div>
      </div>
      <div>
        <img src={benfit} alt="" />
        <div>收益</div>
      </div>
      <div>
        <img src={team} alt="" />
        <div>团队</div>
      </div>
    </div>
  );
};
