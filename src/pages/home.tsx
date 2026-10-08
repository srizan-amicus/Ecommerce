import Hero from "../components/PageContents/Hero";
import QuickLinks from "../components/PageContents/QuickLinks";
import FeaturedParts from "../components/PageContents/FeaturedParts";
import PopularCategories from "../components/PageContents/PopularCategories";
import Footer from "../components/PageContents/Footer";
import type { AddToCartResult } from "../types/cart";

interface HomeProps {
  onAddToCart: (
    productId: number,
    quantity: number,
  ) => Promise<AddToCartResult>;
}

function Home({ onAddToCart }: HomeProps) {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <QuickLinks />
      <FeaturedParts onAddToCart={onAddToCart} />
      <PopularCategories />
      <Footer />
    </div>
  );
}

export default Home;
