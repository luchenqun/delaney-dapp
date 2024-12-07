import { useEffect } from "react";
import { useAccount, useSignMessage, useVerifyMessage } from "wagmi";

const useSign = () => {
    const { address } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { isSuccess, isError } = useVerifyMessage({
      message: 'verify your account',
      signature: address ? localStorage.getItem(address + 'sign') || '' : '',
    });
  
    useEffect(() => {
      const handleSign = async () => {
        if (!address) return;
        
        const sign = localStorage.getItem(address + 'sign');
        if (!sign) {
          try {
            // 如果没有签名，请求用户进行签名
            const signature = await signMessageAsync({ 
              message: 'verify your account' 
            });
            // 保存签名到 localStorage
            localStorage.setItem(address + 'sign', signature);
          } catch (error) {
            console.error('签名失败:', error);
          }
        }
      };
  
      handleSign();
    }, [address, signMessageAsync]);
  
    // 返回验证状态供外部使用
    return {
      isSuccess,
      isError
    };
  };
  
  export default useSign;