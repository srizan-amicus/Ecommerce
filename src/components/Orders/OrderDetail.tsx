import type { OrderDetail } from "../../api/orderApi";

interface OrderDetailsProps {
  detail: OrderDetail;
}

function money(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function OrderDetails({ detail }: OrderDetailsProps) {
  return (
    <div className="space-y-5">
      <div>
        <h4 className="font-bold">Items</h4>

        <div className="mt-3 space-y-2">
          {detail.items.map((item) => (
            <div
              key={item.orderItemId}
              className="flex justify-between gap-4 rounded-xl bg-gray-50 p-3 text-sm"
            >
              <div>
                <p className="font-semibold">{item.productName}</p>

                <p className="mt-1 text-gray-500">
                  Qty {item.quantity} × {money(item.price)}
                </p>
              </div>

              <p className="font-bold">{money(item.itemSubtotal)}</p>
            </div>
          ))}
        </div>
      </div>

      {detail.shipping && (
        <div>
          <h4 className="font-bold">Shipping</h4>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {detail.shipping.shippingName}
            <br />
            {detail.shipping.shippingAddress}
            <br />
            {detail.shipping.shippingCity}, {detail.shipping.shippingState}{" "}
            {detail.shipping.shippingPostalCode}
            <br />
            Method: {detail.shipping.shippingMethod}
          </p>
        </div>
      )}

      <div>
        <h4 className="font-bold">Payment</h4>

        <p className="mt-2 text-sm text-gray-600">
          {detail.payment
            ? `${detail.payment.paymentMethod ?? "Payment"} · ${
                detail.payment.paymentStatus ?? "Status unavailable"
              }`
            : "No payment information available."}
        </p>

        {detail.payment?.transactionReference && (
          <p className="mt-1 break-all text-xs text-gray-500">
            Reference: {detail.payment.transactionReference}
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
