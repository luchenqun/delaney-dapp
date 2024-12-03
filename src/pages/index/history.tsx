import { InfiniteScroll, List, NavBar } from 'antd-mobile';
import { CardDelegate } from '../../components/home/card-delegate';
import { useEffect, useState } from 'react';
import { getDelegates } from '../../utils/api';
import { useAccount } from 'wagmi';

export const HomeHistory = () => {
  const { address } = useAccount();
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  
  const handleBack = () => {
    history.back();
  };

  useEffect(() => {
    if (total > data.length) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [data, total]);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = () => {
    return new Promise<void>((resolve) => {
      getDelegates({ 
        'filters[address]': `='${address?.toLocaleLowerCase()}'`, 
        sort_field: 'create_time',
        sort_order: 'desc',
        page: page + 1
      }).then((res) => {
        setData(data.concat(res.data.data.items));
        setTotal(res.data.data.total);
        setPage(page + 1);
        resolve();
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
