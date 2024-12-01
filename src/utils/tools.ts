export function divideByMillionAndRound(input: number) {
    // 将输入除以 10^6
    const result = input / 1000000;
    // 保留两位小数并截断
    const roundedResult = Math.floor(result * 100) / 100;
    return roundedResult;
  }
  