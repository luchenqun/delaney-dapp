import { InfiniteScroll, List, NavBar } from 'antd-mobile';
import { CardDelegate } from '../../components/home/card-delegate';
import { useEffect, useState } from 'react';
import { getDelegates } from '../../utils/api';
import { useAccount } from 'wagmi';

export const HomeHistory = () => {
  const { address } = useAccount();
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  
  const handleBack = () => {
    history.back();
  };

  const loadMore = () => {
    return new Promise<void>((resolve) => {
      getDelegates({ 
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
        质押列表详情
      </NavBar>
      <div className="bg-[#F5F5F5] min-h-screen pt-10">
        <List>
          {data.map((item, index) => (
            <List.Item key={index}>
              <CardDelegate info={item} />
            </List.Item>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </>
  );
};
