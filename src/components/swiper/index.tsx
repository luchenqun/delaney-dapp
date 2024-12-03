import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import swiper1 from '../../assets/swiper/1.png';
import swiper2 from '../../assets/swiper/2.png';
import 'swiper/css';

export const HomeSwiper = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1.15}
      spaceBetween={6}
      autoplay={{ delay: 3000 }}
      slidesOffsetBefore={20}
      slidesOffsetAfter={20}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img className="rounded-2xl" src={swiper1} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="rounded-2xl" src={swiper2} alt="" />
      </SwiperSlide>
    </Swiper>
  );
};
