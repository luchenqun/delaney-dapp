import { verifyMessage } from 'viem';

const SevenDaySeconds = 7 * 24 * 3600;

export function divideByMillionAndRound(input: number | bigint) {
  // 将输入转换为 number 类型
  const inputAsNumber = typeof input === 'bigint' ? Number(input) : input;
  // 将输入除以 10^6
  const result = inputAsNumber / 1000000;
  // 直接使用 toFixed(2) 来保留两位小数，然后转换回数字
  return Math.floor(result * 100) / 100;
}

export function formatAddressString(address: string) {
  if (!address) return '';
  if (address.length <= 8) {
    return address;
  } else {
    const firstPart = address.substring(0, 8);
    const lastPart = address.substring(address.length - 6);
    return `${firstPart}...${lastPart}`;
  }
}

export function formatSeconds(seconds: number): string {
  // 处理负数或无效输入
  if (seconds < 0 || !Number.isFinite(seconds)) {
    return '无效时间';
  }

  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}天`);
  if (hours > 0) parts.push(`${hours}小时`);
  if (minutes > 0) parts.push(`${minutes}分`);
  if (seconds > 0) parts.push(`${seconds}秒`);

  return parts.length > 0 ? parts.join('') : '0秒';
}

export function afterSeconds(seconds: number) {
  return parseInt((new Date().getTime() / 1000).toString()) + seconds;
}

export function getHashUrl(hash: string) {
  return `${import.meta.env.VITE_APP_HASH_URL}/tx/${hash}`;
}

export function getAddressUrl(address: string) {
  return `${import.meta.env.VITE_APP_HASH_URL}/address/${address}`;
}

export function authorizationKey(address: string) {
  return 'Authorization ' + address;
}

export function currentAddress() {
  return (localStorage.getItem('current_address') || '0x' + '0'.repeat(40)) as `0x${string}`;
}

export function setCurrentAddress(address: `0x${string}`) {
  return localStorage.setItem('current_address', address);
}

export function authorizationValue(address: `0x${string}`) {
  return localStorage.getItem(authorizationKey(address));
}

export function setAuthorizationValue(address: `0x${string}`, timestamp: string, signature: string) {
  localStorage.setItem(authorizationKey(address), timestamp + ' ' + signature);
}

export function clearAuthorization() {
  localStorage.setItem(authorizationKey(currentAddress()), '');
}

export function authorizationSignMessage() {
  return String(afterSeconds(0));
}

export async function authorizationCheck(address: `0x${string}`) {
  const value = authorizationValue(address);
  if (!value) {
    return Promise.reject('authorization value is not exist');
  }
  const [message, signature] = value.split(' ');
  if (!message || !signature) {
    return Promise.reject('sign data timestamp or signature is not exist');
  }

  if (Number.isInteger(Number(message)) && message.length == 10) {
    if (parseInt(message + SevenDaySeconds) < afterSeconds(0)) {
      return Promise.reject('signature is expire');
    }
    console.log('authorizationCheck', { address, message, signature });
    return await verifyMessage({ address, message, signature });
  } else {
    return Promise.reject('sign data timestamp value is not number');
  }
}
