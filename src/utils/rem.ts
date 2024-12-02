export const calculateFontSize = () => {
  const baseWidth = 375; // 设定基准宽度，这里设为375px
  const maxWidth = 1440; // 设定最大宽度，可根据需要修改
  const minWidth = 320; // 设定最小宽度，可根据需要修改
  const baseFontSize = 16; // 基准字体大小（单位：px）

  const screenWidth = window.innerWidth > maxWidth ? maxWidth : window.innerWidth < minWidth ? minWidth : window.innerWidth;
  const fontSize = (screenWidth / baseWidth) * baseFontSize;

  document.documentElement.style.fontSize = `${fontSize}px`;
};
