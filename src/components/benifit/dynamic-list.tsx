import { useEffect, useState } from 'react';
import { getDynamicRewards } from '../../utils/api';
import { useAccount } from 'wagmi';
import { InfiniteScroll, List } from 'antd-mobile';
import { BenifitCardPromotion } from './card-promotion';

export const DynamicList = () => {
  const { address } = useAccount();
  const [dynamicRewards, setDynamicRewards] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (address) {
      loadMore();
    }
  }, [address]);

  useEffect(() => {
    if (total > dynamicRewards.length) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [dynamicRewards]);

  const loadMore = () => {
    return new Promise<void>((resolve) => {
      if (address) {
        getDynamicRewards({ address, page: page + 1, page_size: 10 }).then((res) => {
          setDynamicRewards(dynamicRewards.concat(res.data.data.items));
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
        {dynamicRewards?.map((item: any) => (
          <List.Item key={item.id}>
            <BenifitCardPromotion info={item} />
          </List.Item>
        ))}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </List>
    </div>
  );
};
