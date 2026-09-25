import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import ProductCard from "./ProductCards";
import products from "../data/products";
import "swiper/css";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { fetchProductsFromApi } from "../api/productsApi";

function FeaturedParts() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [apiProducts, setApiProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProductsFromApi();
        setApiProducts(fetchedProducts);
      } catch {
        console.error("Could not load API products");
      }
    };

    loadProducts();
  }, []);

  const allProducts = [...products, ...apiProducts];

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Parts</h2>
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
              {allProducts.map((product) => (
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
