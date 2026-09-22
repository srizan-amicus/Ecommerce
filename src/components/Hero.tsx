function Hero() {
  return (
    <section
      className="relative h-60 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center">
        <h1 className="text-3xl font-black tracking-wide text-white md:text-4xl">
          FIND PRODUCTS, PARTS & ACCESSORIES
        </h1>

        <p className="mt-3 text-sm text-white md:text-base">
          Find the right parts and accessories for your equipment.
        </p>

        {/* Search Bar */}
        <div className="mt-5 flex w-full max-w-md bg-white">
          <input
            type="text"
            placeholder="Search"
            className="h-11 flex-1 bg-white px-4 text-sm text-gray-700 outline-none"
          />

          <button
            className="h-11 w-12 text-lg text-orange-600"
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
