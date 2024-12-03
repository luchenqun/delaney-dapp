import { InfiniteScroll, List, NavBar } from 'antd-mobile';
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
        'filters[address]': `='${address?.toLocaleLowerCase()}'`, 
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
      <NavBar onBack={handleBack} className="fixed top-0 left-0 right-0 z-10 bg-white">
        奖励领取记录
      </NavBar>
      <div className="bg-[#F5F5F5] min-h-screen pt-10">
        <List>
          {data.map((item, index) => (
            <List.Item key={index}>
              <CardClaim info={item} />
            </List.Item>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </>
  );
};
