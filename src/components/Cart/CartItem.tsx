import type { CartItemApiResponse } from "../../api/cartApi";
import QuantitySelector from "../Quantity/QuantitySelector";

interface CartItemProps {
  item: CartItemApiResponse;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="mb-2 grid grid-cols-1 items-center gap-4 border border-gray-300 bg-white px-4 py-4 md:grid-cols-[2.2fr_1fr_1fr_1fr]">
      {/* Product */}
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600"
            alt={item.productName}
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <h3 className="font-bold text-gray-900">{item.productName}</h3>

          <button
            type="button"
            onClick={() => onRemove(item.productId)}
            className="mt-1 text-sm text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Unit Price */}
      <div className="text-gray-700">₹{item.price.toLocaleString("en-IN")}</div>

      {/* Quantity */}
      <div className="flex justify-center">
        <QuantitySelector
          quantity={item.quantity}
          onChange={(quantity) => onQuantityChange(item.productId, quantity)}
        />
      </div>

      {/* Total */}
      <div className="flex items-center font-semibold text-orange-600">
        ₹{item.itemSubtotal.toLocaleString("en-IN")}
      </div>
    </div>
  );
}

export default CartItem;
