import Header from "../components/Header";
import Hero from "../components/Hero";
import QuickLinks from "../components/QuickLinks";
import FeaturedParts from "../components/FeaturedParts";
import PopularCategories from "../components/PopularCategories";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white">

      <Header />

      <Hero />

      <QuickLinks />

      <FeaturedParts />

      <PopularCategories />

      <Footer />

    </div>
  );
}

export default Home;