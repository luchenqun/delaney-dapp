export function divideByMillionAndRound(input: number | bigint) {
  // 将输入转换为 number 类型
  const inputAsNumber = typeof input === 'bigint' ? Number(input) : input;
  // 将输入除以 10^6
  const result = inputAsNumber / 1000000;
  // 直接使用 toFixed(2) 来保留两位小数，然后转换回数字
  return Math.floor(result * 100) / 100;
}

export function formatAddressString(address: string) {
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
