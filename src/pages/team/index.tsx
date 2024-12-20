import { Rating, ThinRoundedStar } from '@smastrom/react-rating';
import { InfiniteScroll, List, NavBar, PullToRefresh, Skeleton } from 'antd-mobile';
import { PeopleCard } from '../../components/team/people-card';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { getTeamUsers, getUser } from '../../utils/api';
import { humanReadable, MudPrecision, UsdtPrecision } from '../../utils/tools';
import { sleep } from 'antd-mobile/es/utils/sleep';
import teamBg from '../../assets/bg.svg';
import JazziconAvatar from '../../components/avatar';

export const Team = () => {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getData();
  }, [address]);

  const getData = () => {
    if (address) {
      setLoading(true);
      getUser({ address }).then((res) => {
        setUserInfo(res.data.data);
        setLoading(false);
      });
    }
  };

  const loadMore = () => {
    return new Promise<void>((resolve) => {
      getTeamUsers({
        address: `${address?.toLowerCase()}`,
        page
      }).then((res) => {
        setList(list.concat(res.data.data.items));
        setPage(page + 1);
        setHasMore(res.data.data.total > list.length);
        resolve();
      });
    });
  };

  if (loading) {
    return (
      <>
        <div className="top-0 z-10 fixed left-0 right-0 header-bg">
          <NavBar back={null}>我的团队</NavBar>
        </div>
        <div className="bg-[#F5F5F5] min-h-screen pt-14 px-4">
          <Skeleton
            animated
            style={{
              '--width': '100%',
              '--height': '200px',
              '--border-radius': '8px'
            }}
          />
          <div className="ml-4 mt-6 font-semibold text-base">社区列表</div>
          <Skeleton
            animated
            className="mt-2"
            style={{
              '--width': '100%',
              '--height': '400px',
              '--border-radius': '8px'
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="top-0 z-10 fixed left-0 right-0 header-bg">
        <NavBar back={null}>我的团队</NavBar>
      </div>
      <div className="bg-[#F5F5F5] min-h-screen pt-14">
        <PullToRefresh
          onRefresh={async () => {
            setList([]);
            setPage(0);
            setHasMore(true);
            getData();
            await sleep(1000);
          }}
        >
          <>
            <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl mt-10 relative z-[3] h-[13.5rem]">
              <div className="flex justify-between items-center">
                <img className="absolute w-[21.4rem] top-[-2.2rem] left-0 z-[2]" src={teamBg} alt="" />
                <div className="flex items-center relative z-[3] top-[-2.5rem]">
                  <JazziconAvatar address={address} diameter={6} />
                  <span className="text-[#989898] text-sm ml-1">我的星级</span>
                  <div className="relative top-[-0.1rem]">
                    <Rating
                      className="w-24 ml-1 relative"
                      value={Math.max(userInfo?.star, userInfo?.min_star)}
                      readOnly
                      itemStyles={{
                        itemShapes: ThinRoundedStar,
                        activeFillColor: '#FEC533',
                        inactiveFillColor: '#F3F3F3'
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-[#46D69C] text-xs text-right bg-[#46D69C1A] absolute top-[-2rem] right-0 w-44 h-12 z-1 px-6 py-2 rounded-r-xl">邀请码:{userInfo?.ref}</div>
              <div className="flex flex-wrap justify-between z-[3] relative top-[-2rem]">
                <div className="flex justify-center flex-wrap items-center mt-4 w-[9.375rem] bg-[#F5F5F5] py-2 rounded-lg min-h-20">
                  <span className="text-[#989898] text-xs w-full text-center">直推质押(USDT)</span>
                  <div className="text-center">
                    <div className="font-semibold text-xl mt-1">{humanReadable(userInfo?.sub_usdt || 0n, UsdtPrecision)}</div>
                    <div className="text-xs text-[#46D69C]">≈ {humanReadable(userInfo?.sub_mud || 0n, MudPrecision)} MUD</div>
                  </div>
                </div>
                <div className="flex justify-center flex-wrap items-center mt-4 w-[9.375rem] bg-[#F5F5F5] py-2 rounded-lg min-h-20">
                  <span className="text-[#989898] text-xs w-full text-center">团队质押(USDT)</span>
                  <div className="text-center">
                    <div className="font-semibold text-xl mt-1">{humanReadable(userInfo?.team_usdt || 0n, UsdtPrecision)}</div>
                    <div className="text-xs text-[#46D69C]">≈ {humanReadable(userInfo?.team_mud || 0n, MudPrecision)} MUD</div>
                  </div>
                </div>
                <div className="flex justify-center flex-wrap items-center mt-4 w-[9.375rem] bg-[#F5F5F5] py-2 rounded-lg min-h-20">
                  <span className="text-[#989898] text-xs w-full text-center">直推人数</span>
                  <div className="text-center">
                    <div className="font-semibold text-xl mt-1">{userInfo?.sub_person}</div>
                  </div>
                </div>
                <div className="flex justify-center flex-wrap items-center mt-4 w-[9.375rem] bg-[#F5F5F5] py-2 rounded-lg min-h-20">
                  <span className="text-[#989898] text-xs w-full text-center">团队人数</span>
                  <div className="text-center">
                    <div className="font-semibold text-xl mt-1">{userInfo?.team_person}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-4 mt-6 font-semibold text-base">社区列表</div>
            {list?.map((item: any) => (
              <List.Item key={item.id}>
                <PeopleCard info={item} depth={userInfo?.depth || 0} />
              </List.Item>
            ))}
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
          </>
        </PullToRefresh>
      </div>
    </>
  );
};
