import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import swiper1 from '../../assets/swiper/1.png';
import swiper2 from '../../assets/swiper/2.png';
import 'swiper/css';
import copy from 'copy-to-clipboard';
import { Toast } from 'antd-mobile';

export const HomeSwiper = () => {
  const handleCopyLink = (link: string) => {
    copy(link);
    Toast.show({
      content: '复制成功'
    });
  };
  
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1.15}
      spaceBetween={6}
      autoplay={{ delay: 3000 }}
      slidesOffsetBefore={20}
      slidesOffsetAfter={20}
    >
      <SwiperSlide>
        <img className="rounded-2xl" src={swiper1} alt="" onClick={() => handleCopyLink("https://baidu.com")} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="rounded-2xl" src={swiper2} alt="" onClick={() => handleCopyLink("https://baidu.com")} />
      </SwiperSlide>
    </Swiper>
  );
};
