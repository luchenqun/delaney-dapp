import { useBalance } from 'wagmi';
import { useEffect } from 'react';

const PRICE_UPDATE_INTERVAL = Number(import.meta.env.VITE_APP_POLL_INTERVAL);

const useContractBalance = (address: string) => {
  const { data, isLoading, refetch } = useBalance({
    address: address as `0x${string}`
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      console.log('refetch');
    }, PRICE_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [refetch, address]);

  return { data: data?.value, isLoading, refetch };
};

export default useContractBalance;
