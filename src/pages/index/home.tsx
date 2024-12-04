import { NoticeBar, PullToRefresh } from 'antd-mobile';
import { HomeHeaders } from '../../components/header';
import notice from '../../assets/notice.svg';
import { HomeSwiper } from '../../components/swiper';
import { HomeCard } from '../../components/home/card';
import { HomeDelegate } from '../../components/home/delegate';
import { useRef } from 'react';

export const Home = () => {
  const headerRef = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const delegateRef = useRef<any>(null);

  const refreshAllData = () => {
    headerRef.current.refresh();
    cardRef.current.refresh();
    delegateRef.current.refresh();
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        refreshAllData();
      }}
    >
      <div className="bg-[#F5F5F5] min-h-screen">
        <HomeHeaders ref={headerRef} />

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
          <HomeCard ref={cardRef} />
        </div>

        <div>
          <HomeDelegate ref={delegateRef} refresh={refreshAllData} />
        </div>
      </div>
    </PullToRefresh>
  );
};
