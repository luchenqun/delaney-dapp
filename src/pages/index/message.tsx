import { InfiniteScroll, List, NavBar, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import empty from '../../assets/empty.svg';
import { useEffect, useState } from 'react';
import { getMessages, setMessageRead } from '../../utils/api';
import message from '../../assets/message.svg';
import { useAccount } from 'wagmi';
import dayjs from 'dayjs';
import './message.css';
export const Message = () => {
  const navigate = useNavigate();
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setMessageRead({ address: address as string });
    }
  }, [address]);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 header-bg">
        <NavBar onBack={() => navigate('/')}>消息</NavBar>
      </div>
      <div className="pt-10 bg-[#F5F5F5] min-h-screen">
        <MessageContent />
      </div>
    </>
  );
};

const MessageContent = () => {
  const { address } = useAccount();
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadMore = () => {
    return new Promise<void>((resolve) => {
      getMessages({
        page: page + 1,
        page_size: 10,
        sort_field: 'create_time',
        sort_order: 'desc',
        filters: { address: `='${address?.toLocaleLowerCase()}'` }
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
      {data.length === 0 && !hasMore && (
        <div className="felx h-full items-center justify-center">
          <div className="flex flex-col items-center mt-32">
            <img src={empty} alt="" />
            <div className="text-sm text-gray-500 mt-3">暂无消息通知</div>
          </div>
        </div>
      )}
      <List>
        {data.map((item, index) => (
          <List.Item key={index} className="message">
            <MessageItem info={item} />
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  );
};

const MessageItem = ({ info }: { info: any }) => {
  const handleCopy = () => {
    copy(info.content);
    Toast.show('消息复制成功');
  };

  return (
    <div
      onClick={() => {
        handleCopy();
      }}
      className="flex items-start px-4 py-3 bg-white"
    >
      <img src={message} className="mr-2" alt="" />
      <div>
        <div className="font-semibold text-base">{info.title}</div>
        <div className="text-sm mt-2 break-all">{info.content}</div>
        <div className="text-xs text-gray-500 mt-1">{dayjs.unix(info.create_time).format('YYYY-MM-DD HH:mm')}</div>
      </div>
    </div>
  );
};
