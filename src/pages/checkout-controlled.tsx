import CheckoutSteps from "../components/CheckoutSteps";
import ShippingFormControlled from "../components/Forms/controlled/ShippingFormControlled";

function CheckoutControlled() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="mx-auto max-w-[1280px] px-6 py-4">
        {/* Breadcrumb */}
        <div className="mb-4 text-xs text-gray-500">
          Home <span className="mx-2">→</span> Cart
          <span className="mx-2">→</span> Checkout
        </div>

        {/* Page Title */}
        <h1 className="mb-6 text-xl font-bold text-gray-900">Checkout</h1>

        {/* Checkout Steps */}
        <CheckoutSteps />

        <ShippingFormControlled />
      </main>
    </div>
  );
}

export default CheckoutControlled;
