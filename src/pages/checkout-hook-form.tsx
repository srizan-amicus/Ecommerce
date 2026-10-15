import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import OrderSummary from "../components/Checkout/OrderSummary";
import PageMetadata from "../components/Common/PageMetadata";
import ShippingFormHookForm from "../components/Forms/reactHook/ShippingFormHookForm";
import type { CartItemApiResponse } from "../api/cartApi";

interface CheckoutHookFormProps {
  cartItems: CartItemApiResponse[];
  subtotal: number;
}

function CheckoutHookForm({ cartItems, subtotal }: CheckoutHookFormProps) {
  return (
    <>
      <PageMetadata
        title="Checkout — SwiftCart"
        description="Complete your SwiftCart shipping details, review your order, and continue to payment."
      />

      <div className="min-h-screen bg-white text-gray-800">
        <main className="mx-auto max-w-[1280px] px-6 py-4">
          <h1 className="mb-6 text-xl font-bold text-gray-900">Checkout</h1>

          <CheckoutSteps activeStep={1} />

          <ShippingFormHookForm>
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              hideTotals
              actionLabel="PROCEED TO PAYMENT"
              actionType="submit"
            />
          </ShippingFormHookForm>
        </main>
      </div>
    </>
  );
}

export default CheckoutHookForm;
