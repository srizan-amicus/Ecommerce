import type { OrderHistoryItem, OrderDetail } from "../../api/orderApi";
import Button from "../Common/Button";
import { ButtonVariant } from "../../enums/button";
import OrderDetails from "./OrderDetail";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600";

interface OrderCardProps {
  order: OrderHistoryItem;
  detail?: OrderDetail;
  isExpanded: boolean;
  isDetailsLoading: boolean;
  isReordering: boolean;
  onToggleDetails: (orderId: number) => void;
  onReorder: (orderId: number) => void;
}

function money(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime())
    ? "Date unavailable"
    : parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

function statusStyle(status: string) {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "cancelled":
    case "canceled":
      return "bg-red-100 text-red-700";
    case "processing":
    case "placed":
    case "pending":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getOrderItemCount(order?: OrderDetail): number | null {
  return order
    ? order.items.reduce((total, item) => total + item.quantity, 0)
    : null;
}

function OrderCard({
  order,
  detail,
  isExpanded,
  isDetailsLoading,
  isReordering,
  onToggleDetails,
  onReorder,
}: OrderCardProps) {
  const itemCount = getOrderItemCount(detail);

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-orange-200 hover:shadow-md">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-extrabold">Order #{order.orderId}</h3>

              {itemCount !== null && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              )}

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyle(
                  order.orderStatus,
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Order total
            </p>

            <p className="mt-1 text-xl font-extrabold text-orange-600">
              {money(order.totalAmount)}
            </p>
          </div>
        </div>

        {detail && detail.items.length > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {detail.items.slice(0, 4).map((item) => (
              <img
                key={item.orderItemId}
                src={FALLBACK_IMAGE}
                alt={item.productName}
                title={item.productName}
                loading="lazy"
                className="h-14 w-14 shrink-0 rounded-xl border border-gray-200 bg-gray-50 object-cover"
              />
            ))}

            {detail.items.length > 4 && (
              <span className="flex h-14 items-center rounded-xl bg-gray-100 px-3 text-sm font-semibold text-gray-600">
                +{detail.items.length - 4} more
              </span>
            )}
          </div>
        ) : !detail ? (
          <p className="mt-3 text-xs text-gray-400">
            View details to see the items in this order.
          </p>
        ) : null}

        <div className="my-5 grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">Subtotal</p>
            <p className="mt-1 font-bold">{money(order.subtotal)}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Shipping</p>
            <p className="mt-1 font-bold">{money(order.shippingCharge)}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Tax</p>
            <p className="mt-1 font-bold">{money(order.tax)}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant={ButtonVariant.Outline}
            onClick={() => onToggleDetails(order.orderId)}
            aria-expanded={isExpanded}
            className="!w-auto !rounded-xl !px-4 !py-2.5 !text-sm !font-bold"
          >
            {isExpanded ? "Hide Details" : "View Details"}
          </Button>

          <Button
            type="button"
            variant={ButtonVariant.Secondary}
            disabled={isReordering}
            onClick={() => onReorder(order.orderId)}
            className="!w-auto !rounded-xl !bg-gray-900 !px-4 !py-2.5 !text-sm !font-bold !text-white hover:!bg-orange-600 disabled:!opacity-50"
          >
            {isReordering ? "Adding..." : "Reorder"}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-5 border-t border-gray-100 pt-5">
            {isDetailsLoading && !detail ? (
              <p className="text-sm text-gray-500">Loading details...</p>
            ) : detail ? (
              <OrderDetails detail={detail} />
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}

export default OrderCard;
