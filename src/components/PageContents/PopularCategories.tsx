import { useNavigate } from "react-router-dom";
import Button from "../Common/Button";
function PopularCategories() {
  const navigate = useNavigate();
  const categories = [
    { id: 8, name: "Accessories" },
    { id: 3, name: "Books" },
    { id: 2, name: "Clothing" },
    { id: 1, name: "Electronics" },
    { id: 6, name: "Everyday Use" },
    { id: 4, name: "Home" },
    { id: 5, name: "Sports" },
    { id: 7, name: "Toys" },
  ];
  const handleCategoryClick = (categoryId: number) => {
    navigate(`/product-list?categoryId=${categoryId}`);
  };
  return (
    <section className="bg-white py-8">
      {" "}
      <div className="mx-auto max-w-6xl px-6">
        {" "}
        <div className="mb-5 flex items-center justify-center">
          {" "}
          <h2 className="text-xl font-bold text-gray-800">
            {" "}
            Popular Categories{" "}
          </h2>{" "}
        </div>{" "}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {" "}
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              onClick={() => handleCategoryClick(category.id)}
              className="h-12 w-full rounded-md border border-gray-300 bg-white px-2 text-[10px] font-semibold text-orange-600 hover:bg-orange-50 sm:text-[11px] md:h-14"
            >
              {" "}
              {category.name}{" "}
            </Button>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
export default PopularCategories;
