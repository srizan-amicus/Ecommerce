import Hero from "../components/PageContents/Hero";
import QuickLinks from "../components/PageContents/QuickLinks";
import FeaturedParts from "../components/PageContents/FeaturedParts";
import PopularCategories from "../components/PageContents/PopularCategories";
import PageMetadata from "../components/Common/PageMetadata";

import type { AddToCartResult } from "../types/cart";

interface HomeProps {
  onAddToCart: (
    productId: number,
    quantity: number,
  ) => Promise<AddToCartResult>;
}

function Home({ onAddToCart }: HomeProps) {
  return (
    <>
      <PageMetadata
        title="SwiftCart — Shop Smarter"
        description="Discover products, explore categories, and shop your favorites with SwiftCart."
      />

      <div className="min-h-screen bg-white">
        <Hero />
        <QuickLinks />
        <FeaturedParts onAddToCart={onAddToCart} />
        <PopularCategories />
      </div>
    </>
  );
}

export default Home;
