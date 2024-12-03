import { useEffect, useState } from 'react';
import { getStaticRewards } from '../../utils/api';
import { useAccount } from 'wagmi';
import { BenifitCard } from './card';
import { InfiniteScroll, List } from 'antd-mobile';

export const StaticList = () => {
  const { address } = useAccount();
  const [staticRewards, setStaticRewards] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (address) {
      loadMore();
    }
  }, [address]);

  useEffect(() => {
    if (total > staticRewards.length) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [staticRewards]);

  const loadMore = () => {
    return new Promise<void>((resolve) => {
      if (address) {
        getStaticRewards({ address, page: page + 1, page_size: 10 }).then((res) => {
          setStaticRewards(staticRewards.concat(res.data.data.items));
          setTotal(res.data.data.total);
          setPage(page + 1);
          resolve();
        });
      }
    });
  };

  return (
    <div className="mt-3">
      <List>
        {staticRewards?.map((item: any) => (
          <List.Item key={item.id}>
            <BenifitCard info={item} />
          </List.Item>
        ))}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </List>
    </div>
  );
};
