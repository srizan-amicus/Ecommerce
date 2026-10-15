import Button from "../components/Common/Button";
import Card from "../components/Common/Card";
import PageMetadata from "../components/Common/PageMetadata";
import { ButtonVariant } from "../enums/button";

function Showcase() {
  return (
    <>
      <PageMetadata
        title="Component Showcase — SwiftCart"
        description="Explore SwiftCart's reusable UI component library, featuring button variants and card styles for a consistent shopping experience."
      />

      <div className="min-h-screen bg-white p-8">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Reusable Button & Card Library
        </h1>

        <div className="mb-6 bg-gray-100 py-3 text-center text-xl font-bold">
          Button Varients and Card Components
        </div>

        {/* Section A */}
        <div>
          <div className="bg-gray-800 px-6 py-3 text-xl font-bold text-white">
            BUTTON VARIANTS
          </div>

          <div className="border border-gray-200 p-8">
            <div className="flex flex-wrap justify-around gap-8">
              <div className="text-center">
                <Button variant={ButtonVariant.Primary}>ORDER NOW</Button>
                <p className="mt-3">Primary</p>
              </div>

              <div className="text-center">
                <Button variant={ButtonVariant.Secondary}>VIEW MANUALS</Button>
                <p className="mt-3">Secondary</p>
              </div>

              <div className="text-center">
                <Button variant={ButtonVariant.Outline}>SEARCH</Button>
                <p className="mt-3">Outline</p>
              </div>

              <div className="text-center">
                <Button variant={ButtonVariant.Danger}>REMOVE</Button>
                <p className="mt-3">Danger</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section B — Card Variants */}
        <div className="mt-8">
          <div className="bg-gray-800 px-6 py-3 text-xl font-bold text-white">
            CARD VARIANTS
          </div>

          <div className="border border-gray-200 p-8">
            <div className="flex flex-wrap justify-center gap-12">
              <div className="text-center">
                <Card
                  variant="elevated"
                  title="Order Now"
                  footer={<Button variant="primary">ORDER NOW</Button>}
                >
                  Quickly place your order for parts.
                </Card>

                <p className="mt-3 text-lg">Elevated</p>
              </div>

              <div className="text-center">
                <Card
                  variant="bordered"
                  title="Aftermarket Products"
                  footer={<Button variant="primary">BROWSE PRODUCTS</Button>}
                >
                  Spare parts catalog.
                </Card>

                <p className="mt-3 text-lg">Bordered</p>
              </div>

              <div className="text-center">
                <Card
                  variant="flat"
                  title="Support"
                  footer={<Button variant="outline">CONTACT SUPPORT</Button>}
                >
                  Technical help center.
                </Card>

                <p className="mt-3 text-lg">Flat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Showcase;
