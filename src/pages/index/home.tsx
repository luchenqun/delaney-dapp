import { NoticeBar } from 'antd-mobile';
import { HomeHeaders } from '../../components/header';
import notice from '../../assets/notice.svg';
import { HomeSwiper } from '../../components/swiper';
import { HomeCard } from '../../components/home/card';
import { HomeDelegate } from '../../components/home/delegate';

export const Home = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <HomeHeaders />

      <div className="my-3 pt-12">
        <HomeSwiper />
      </div>

      <NoticeBar
        icon={<img src={notice} />}
        content="欢迎大家参与光怪陆离的魔法世界!MUD第一生态：Delaney公测于2024年11月10日开启!"
        color="alert"
        className="w-[21.5rem] rounded-3xl mx-auto"
      />

      <div>
        <HomeCard />
      </div>

      <div>
        <HomeDelegate />
      </div>
    </div>
  );
};
