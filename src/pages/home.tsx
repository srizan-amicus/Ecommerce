import Hero from "../components/PageContents/Hero";
import QuickLinks from "../components/PageContents/QuickLinks";
import FeaturedParts from "../components/PageContents/FeaturedParts";
import PopularCategories from "../components/PageContents/PopularCategories";
import Footer from "../components/PageContents/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <QuickLinks />

      <FeaturedParts />

      <PopularCategories />

      <Footer />
    </div>
  );
}

export default Home;
