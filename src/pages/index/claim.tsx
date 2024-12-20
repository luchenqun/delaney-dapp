import { InfiniteScroll, List, NavBar, PullToRefresh } from 'antd-mobile';
import { useState } from 'react';
import { getClaims } from '../../utils/api';
import { useAccount } from 'wagmi';
import { CardClaim } from '../../components/home/card-claim';

export const Claim = () => {
  const { address } = useAccount();
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const handleBack = () => {
    history.back();
  };

  const loadMore = () => {
    return new Promise<void>((resolve) => {
      getClaims({
        filters: { address: `='${address?.toLocaleLowerCase()}'` },
        sort_field: 'create_time',
        sort_order: 'desc',
        page: page + 1
      }).then((res) => {
        setData(data.concat(res.data.data.items));
        setPage(page + 1);
        resolve();
        if (res.data.data.total > data.length) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      });
    });
  };

  return (
    <>
      <NavBar onBack={handleBack} className="fixed top-0 left-0 right-0 z-10 header-bg">
        奖励领取记录
      </NavBar>
      <div className="bg-[#F5F5F5] min-h-screen pt-12">
        <PullToRefresh
          onRefresh={async () => {
            setData([]);
            setPage(0);
            setHasMore(true);
          }}
        >
          <List>
            {data.map((item, index) => (
              <List.Item key={index}>
                <CardClaim info={item} />
              </List.Item>
            ))}
          </List>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </PullToRefresh>
      </div>
    </>
  );
};
