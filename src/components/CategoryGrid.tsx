import Card from "./Card";
import Button from "./Button";

function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card
            variant="elevated"
            title="Engine Parts"
            footer={<Button variant="outline">VIEW PRODUCTS</Button>}
          >
            Explore engine components and replacement parts.
          </Card>

          <Card
            variant="bordered"
            title="Electrical Parts"
            footer={<Button variant="outline">VIEW PRODUCTS</Button>}
          >
            Find electrical components for your equipment.
          </Card>

          <Card
            variant="flat"
            title="Hydraulic Parts"
            footer={<Button variant="outline">VIEW PRODUCTS</Button>}
          >
            Browse hydraulic systems and related components.
          </Card>
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
