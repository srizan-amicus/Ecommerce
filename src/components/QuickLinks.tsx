import Card from "./Card";
import Button from "./Button";

function QuickLinks() {
  const links = [
    {
      title: "Order Now",
      description: "Already know your product number?",
      button: "ORDER NOW",
      variant: "elevated" as const,
    },
    {
      title: "Aftermarket Products",
      description: "Browse through our products catalog.",
      button: "AFTERMARKET PRODUCTS",
      variant: "flat" as const,
    },
    {
      title: "Interactive Parts Manuals",
      description: "Find the right products in our interactive manuals.",
      button: "VIEW MANUALS",
      variant: "elevated" as const,
    },
    {
      title: "Technical Publications",
      description:
        "Download schematics, forms and manuals (Parts, Operation, Service and Supplemental).",
      button: "SEARCH PUBLICATIONS",
      variant: "flat" as const,
    },
  ];

  return (
    <section className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {links.map((link) => (
            <div key={link.title} className="h-full">
              <Card
                variant={link.variant}
                title={link.title}
                className="rounded-xl"
                footer={
                  <Button
                    variant={link.variant === "flat" ? "outline" : "primary"}
                    className="w-full h-11 text-[10px] sm:text-[11px] font-bold tracking-wide rounded-md"
                  >
                    {link.button}
                  </Button>
                }
              >
                {link.description}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickLinks;
