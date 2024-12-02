import { TabBar } from 'antd-mobile';
import benifit from '../../assets/icon/benifit.svg';
import home from '../../assets/icon/home.svg';
import team from '../../assets/icon/team.svg';
import activeBenifit from '../../assets/icon/active-benifit.svg';
import activeHome from '../../assets/icon/active-home.svg';
import activeTeam from '../../assets/icon/active-team.svg';
import { useLocation, useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <img src={home} alt="" />,
      activeIcon: <img src={activeHome} alt="" />
    },
    {
      key: '/benifit',
      title: '收益',
      icon: <img src={benifit} alt="" />,
      activeIcon: <img src={activeBenifit} alt="" />
    },
    {
      key: '/team',
      title: '团队',
      icon: <img src={team} alt="" />,
      activeIcon: <img src={activeTeam} alt="" />
    }
  ];

  return (
    <div className="h-12 text-[#9CA8BA] bg-white fixed bottom-0 left-0 w-screen shadow">
      <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={(active) => (!active ? item.icon : item.activeIcon)} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};
