import { Rating, ThinRoundedStar } from '@smastrom/react-rating';
import { DotLoading, InfiniteScroll, List, NavBar } from 'antd-mobile';
import { PeopleCard } from '../../components/team/people-card';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { getUser, getUsers } from '../../utils/api';
import { divideByMillionAndRound } from '../../utils/tools';

export const Team = () => {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (address) {
      setLoading(true);
      getUser({ address }).then((res) => {
        setUserInfo(res.data.data);
        setLoading(false);
      });
      getList(1);
    }
  }, [address]);

  const getList = (page: number) => {
    return new Promise<void>((resolve) => {
      getUsers({ filters: { parent: `='${address?.toLowerCase()}'` }, page }).then((res) => {
        setList(res.data.data.items);
        setTotal(res.data.data.total);
        setHasMore(res.data.data.total > res.data.data.items.length);
        setPage(res.data.data.pages);
      });
      resolve();
    });
  };

  const loadMore = () => {
    return getList(page + 1);
  };

  if (loading) {
    return (
      <>
        <div className="top-0 z-10 fixed left-0 right-0 bg-white">
          <NavBar back={null}>我的团队</NavBar>
        </div>
        <div className="flex justify-center items-center h-screen text-5xl">
          <DotLoading color="primary" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="top-0 z-10 fixed left-0 right-0 bg-white">
        <NavBar back={null}>我的团队</NavBar>
      </div>
      <div className="bg-[#F5F5F5] min-h-screen pt-12">
        <div className="w-[21.4rem] bg-white p-4 mx-auto rounded-2xl">
          <div className="flex justify-between items-center">
            <span className="text-[#989898] text-sm">我的星级</span>
            <div>
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
          <div className="flex justify-between items-center mt-4">
            <span className="text-[#989898] text-sm">直推质押</span>
            <div className="text-right">
              <div className="font-semibold text-sm">{divideByMillionAndRound(userInfo?.usdt)} USDT</div>
              <div className="text-xs">{divideByMillionAndRound(userInfo?.mud)} MUD</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[#989898] text-sm">团队质押</span>
            <div className="text-right">
              <div className="font-semibold text-sm">{divideByMillionAndRound(userInfo?.team_usdt)} USDT</div>
              <div className="text-xs">{divideByMillionAndRound(userInfo?.team_mud)} MUD</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[#989898] text-sm">直推人数</span>
            <div>
              <div className="font-semibold text-sm">{userInfo?.sub_person}</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[#989898] text-sm">团队人数</span>
            <div>
              <div className="font-semibold text-sm">{userInfo?.team_person}</div>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-6 font-semibold text-base">直推人员列表</div>
        {list?.map((item: any) => (
          <List.Item key={item.id}>
            <PeopleCard info={item} />
          </List.Item>
        ))}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </>
  );
};
