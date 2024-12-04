import { useReadContract } from 'wagmi';
import { useEffect } from 'react';
import { erc20Abi } from 'viem';

const PRICE_UPDATE_INTERVAL = Number(import.meta.env.VITE_APP_POLL_INTERVAL);

const useContractBalance = (address: string, contractAddress: string) => {
  const { data, isLoading, refetch } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      console.log('refetch');
    }, PRICE_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [refetch, address, contractAddress]);

  return { data, isLoading, refetch };
};

export default useContractBalance;