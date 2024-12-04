import { useReadContract } from 'wagmi';
import { useEffect, useState } from 'react';
import delaneyAbi from '../../abi/delaney.json';

const PRICE_UPDATE_INTERVAL = Number(import.meta.env.VITE_APP_POLL_INTERVAL);

export const useMudPrice = () => {
  const [price, setPrice] = useState<bigint | null>(null);

  const { data: mudPrice, refetch } = useReadContract({
    functionName: 'mudPrice',
    abi: delaneyAbi,
    address: import.meta.env.VITE_APP_DELANEY_ADDRESS,
    args: []
  });

  useEffect(() => {
    setPrice(mudPrice as bigint);
  }, [mudPrice]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, PRICE_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [refetch]);

  return { price, refetch };
};