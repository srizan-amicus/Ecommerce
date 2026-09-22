import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import ProductCard from "./ProductCards";
import { products } from "../pages/Products";

import "swiper/css";

function FeaturedParts() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Parts</h2>

          <button className="text-sm text-orange-600 font-semibold hover:text-orange-700">
            VIEW ALL PRODUCTS →
          </button>
        </div>

        {/* Carousel */}
        <div className="flex items-center gap-6">
          {/* Previous Arrow */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="shrink-0 text-orange-600 text-5xl font-bold hover:text-orange-700"
          >
            ‹
          </button>

          {/* Swiper */}
          <div className="flex-1 min-w-0">
            <Swiper
              modules={[Navigation]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={16}
              slidesPerView={4}
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Next Arrow */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="shrink-0 text-orange-600 text-5xl font-bold hover:text-orange-700"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedParts;
