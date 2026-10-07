import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Common/SearchBar";

function Hero() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = search.trim();

    if (!query) {
      navigate("/product-list");
      return;
    }

    navigate(`/product-list?search=${encodeURIComponent(query)}`);
  };

  return (
    <section
      className="relative h-60 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600')",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative flex h-full flex-col items-center justify-center">
        <h1 className="text-3xl font-black tracking-wide text-white md:text-4xl">
          FIND PRODUCTS, PARTS & ACCESSORIES
        </h1>

        <p className="mt-3 text-sm text-white md:text-base">
          Find the right parts and accessories for your equipment.
        </p>

        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          placeholder="Search"
          className="mt-5 w-full max-w-md"
        />
      </div>
    </section>
  );
}

export default Hero;
