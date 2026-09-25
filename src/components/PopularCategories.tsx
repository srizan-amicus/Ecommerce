import Button from "./Button";

function PopularCategories() {
  const categories = [
    "Accessories",
    "Telematics & Parts",
    "Engine Parts",
    "Service Parts",
    "Service Kits",
    "Oil",
    "Filters",
    "Aftermarket Attachments",
  ];

  return (
    <section className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            Popular Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="w-full h-12 md:h-14 px-2 text-[10px] sm:text-[11px] rounded-md border border-gray-300 bg-white text-orange-600 font-semibold hover:bg-orange-50"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCategories;
