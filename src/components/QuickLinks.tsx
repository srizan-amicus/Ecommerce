import Card from "./Card";
import Button from "./Button";
import { ButtonVariant } from "../enums/button";

function QuickLinks() {
  const links = [
    {
      title: "Order Now",
      description: "Already know your product number?",
      button: "ORDER NOW",
      variant: "elevated" as const,
      buttonVariant: ButtonVariant.Primary,
    },
    {
      title: "Aftermarket Products",
      description: "Browse through our products catalog.",
      button: "AFTERMARKET PRODUCTS",
      variant: "flat" as const,
      buttonVariant: ButtonVariant.Primary,
    },
    {
      title: "Interactive Parts Manuals",
      description: "Find the right products in our interactive manuals.",
      button: "VIEW MANUALS",
      variant: "elevated" as const,
      buttonVariant: ButtonVariant.Primary,
    },
    {
      title: "Technical Publications",
      description:
        "Download schematics, forms and manuals (Parts, Operation, Service and Supplemental).",
      button: "SEARCH PUBLICATIONS",
      variant: "flat" as const,
      buttonVariant: ButtonVariant.Primary,
    },
  ];

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {links.map((link) => (
            <div key={link.title} className="h-full">
              <Card
                variant={link.variant}
                title={link.title}
                className="rounded-xl"
                footer={
                  <Button
                    variant={link.buttonVariant}
                    className="h-11 w-full rounded-md text-[10px] font-bold tracking-wide sm:text-[11px]"
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
