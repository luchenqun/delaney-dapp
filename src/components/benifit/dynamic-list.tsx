import { useEffect, useState } from 'react';
import { getDynamicRewards } from '../../utils/api';
import { useAccount } from 'wagmi';
import { InfiniteScroll, List } from 'antd-mobile';
import { BenifitCardPromotion } from './card-promotion';

export const DynamicList = () => {
  const { address } = useAccount();
  const [dynamicRewards, setDynamicRewards] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadMore = () => {
    return new Promise<void>((resolve) => {
      if (address) {
        getDynamicRewards({
          filters: { address: `='${address?.toLocaleLowerCase()}'` },
          page: page + 1,
          page_size: 10,
          sort_field: 'create_time',
          sort_order: 'desc'
        }).then((res) => {
          setDynamicRewards(dynamicRewards.concat(res.data.data.items));
          setPage(page + 1);
          if (res.data.data.total > dynamicRewards.length) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
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
