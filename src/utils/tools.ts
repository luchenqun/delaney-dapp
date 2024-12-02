export function divideByMillionAndRound(input: number | bigint) {
  // 将输入转换为 number 类型
  const inputAsNumber = typeof input === 'bigint' ? Number(input) : input;
  // 将输入除以 10^6
  const result = inputAsNumber / 1000000;
  // 直接使用 toFixed(2) 来保留两位小数，然后转换回数字
  return Number(result.toFixed(2));
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
