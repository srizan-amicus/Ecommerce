import type { CartItemApiResponse } from "../../api/cartApi";
import QuantitySelector from "../Quantity/QuantitySelector";

interface CartItemProps {
  item: CartItemApiResponse;
  onQuantityChange: (
    productId: number,
    quantity: number,
  ) => void;
  onRemove: (productId: number) => void;
}

function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 border-b border-gray-200 py-5 md:grid-cols-4">
      {/* Product */}
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <span className="text-sm text-gray-400">
            Image
          </span>
        </div>

        <div>
          <h3 className="font-medium text-gray-900">
            {item.productName}
          </h3>

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
      <div className="text-gray-700">
        ₹{item.price.toLocaleString("en-IN")}
      </div>

      {/* Quantity */}
      <div>
        <QuantitySelector
          quantity={item.quantity}
          onChange={(quantity) =>
            onQuantityChange(
              item.productId,
              quantity,
            )
          }
        />
      </div>

      {/* Total */}
      <div className="font-semibold text-gray-900">
        ₹{item.itemSubtotal.toLocaleString("en-IN")}
      </div>
    </div>
  );
}

export default CartItem;