import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css";

import arrowLeft from "./assets/arrow-left.svg";
import arrowRight from "./assets/arrow-right.svg";

interface Props {
    slides: string[];
}

function Carousel({ slides }: Props) {
    return (
        <Swiper
            modules={[EffectCoverflow, Navigation, Pagination]}
            navigation={{
                prevEl: ".button-prev",
                nextEl: ".button-next",
            }}
            pagination={{
                clickable: true,
            }}
            speed={1000}
            slidesPerView={"auto"}
            centeredSlides
            effect={"coverflow"}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            initialSlide={1} // Set the initial slide index to 1 (the second image)
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className="slide-inner">
                    <img className={"Carousel"} src={slide} alt="" />
                </SwiperSlide>
            ))}
            <div className="button-prev">
                <img className={"Carousel"} src={arrowLeft} alt="Left" />
            </div>
            <div className="button-next">
                <img className={"Carousel"} src={arrowRight} alt="Right" />
            </div>
        </Swiper>
    );
}

export default Carousel;