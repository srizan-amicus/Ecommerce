import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import ProductCard from "../Products/productCards";
import useProducts from "../../hooks/useProducts";
import "swiper/css";
import type { AddToCartResult } from "../../types/cart";

interface FeaturedPartsProps {
  onAddToCart: (
    productId: number,
    quantity: number,
  ) => Promise<AddToCartResult>;
}
function FeaturedParts({ onAddToCart }: FeaturedPartsProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const { products: apiProducts, loading } = useProducts();

  return (
    <section className="bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Heading */}
        <div className="mb-6 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800">Featured Parts</h2>
        </div>

        {/* Carousel */}
        <div className="flex items-center gap-6">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="shrink-0 text-5xl font-bold text-orange-600 hover:text-orange-700"
            aria-label="Previous products"
          >
            ‹
          </button>

          {/* Products / Loading */}
          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-64 animate-pulse rounded-md bg-gray-200"
                  />
                ))}
              </div>
            ) : (
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
                {apiProducts.map((product) => (
                  <SwiperSlide key={`${product.id}-${product.name}`}>
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="shrink-0 text-5xl font-bold text-orange-600 hover:text-orange-700"
            aria-label="Next products"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedParts;
