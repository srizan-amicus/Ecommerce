import Button from "../components/Button";
import Card from "../components/Card";

function Showcase() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Reusable Button & Card Library
      </h1>

      <div className="text-center bg-gray-100 py-3 mb-6 font-bold text-xl">
        Button Varients and Card Components
      </div>

      {/* Section A */}
      <div>
        <div className="bg-gray-800 text-white px-6 py-3 text-xl font-bold">
        BUTTON VARIANTS
        </div>

        <div className="border border-gray-200 p-8">
          <div className="flex flex-wrap justify-around gap-8">

            <div className="text-center">
              <Button variant="primary">
                ORDER NOW
              </Button>
              <p className="mt-3">Primary</p>
            </div>

            <div className="text-center">
              <Button variant="secondary">
                VIEW MANUALS
              </Button>
              <p className="mt-3">Secondary</p>
            </div>

            <div className="text-center">
              <Button variant="outline">
                SEARCH
              </Button>
              <p className="mt-3">Outline</p>
            </div>

            <div className="text-center">
              <Button variant="danger">
                REMOVE
              </Button>
              <p className="mt-3">Danger</p>
            </div>

          </div>
        </div>
      </div>

    {/* Section B — Card Variants */}
<div className="mt-8">
  <div className="bg-gray-800 text-white px-6 py-3 text-xl font-bold">
    CARD VARIANTS
  </div>

  <div className="border border-gray-200 p-8">
    <div className="flex justify-center gap-12">

      <div className="text-center">
        <Card
          variant="elevated"
          title="Order Now"
          footer={
            <Button variant="primary">
              ORDER NOW
            </Button>
          }
        >
          Quickly place your order for parts.
        </Card>

        <p className="mt-3 text-lg">
          Elevated
        </p>
      </div>

      <div className="text-center">
        <Card
          variant="bordered"
          title="Aftermarket Products"
          footer={
            <Button variant="primary">
              BROWSE PRODUCTS
            </Button>
          }
        >
          Spare parts catalog.
        </Card>

        <p className="mt-3 text-lg">
          Bordered
        </p>
      </div>

      <div className="text-center">
        <Card
          variant="flat"
          title="Support"
          footer={
            <Button variant="outline">
              CONTACT SUPPORT
            </Button>
          }
        >
          Technical help center.
        </Card>

        <p className="mt-3 text-lg">
          Flat
        </p>
      </div>

    </div>
  </div>
</div>

    </div>
  );
}

export default Showcase;