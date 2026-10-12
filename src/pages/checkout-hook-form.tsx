import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import OrderSummary from "../components/Checkout/OrderSummary";
import ShippingFormHookForm from "../components/Forms/reactHook/ShippingFormHookForm";
import type { CartItemApiResponse } from "../api/cartApi";

interface CheckoutHookFormProps {
  cartItems: CartItemApiResponse[];
  subtotal: number;
}

function CheckoutHookForm({ cartItems, subtotal }: CheckoutHookFormProps) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="mx-auto max-w-[1280px] px-6 py-4">
        {/* Page Title */}
        <h1 className="mb-6 text-xl font-bold text-gray-900">Checkout</h1>

        {/* Checkout Steps */}
        <CheckoutSteps />

        <ShippingFormHookForm>
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            actionLabel="PLACE ORDER"
            actionType="submit"
          />
        </ShippingFormHookForm>
      </main>
    </div>
  );
}

export default CheckoutHookForm;
