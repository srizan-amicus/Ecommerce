import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  getOrderHistory,
  getOrderById,
  reorderOrder,
  type OrderHistoryItem,
  type OrderDetail,
} from "../api/orderApi";

import useCart from "../hooks/useCart";
import Button from "../components/Common/Button";
import { ButtonVariant } from "../enums/button";

const PAGE_SIZE = 8;
const TABS = ["All Orders", "Processing", "Shipped", "Delivered", "Cancelled"];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const date = (value: string) => {
  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime())
    ? "Date unavailable"
    : parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

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

function Orders() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [tab, setTab] = useState("All Orders");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [details, setDetails] = useState<Record<number, OrderDetail>>({});
  const [detailsLoading, setDetailsLoading] = useState(false);

  const { fetchCart } = useCart();

  useEffect(() => {
    let ignore = false;

    async function loadOrders() {
      try {
        setError("");

        const result = await getOrderHistory({
          status: tab === "All Orders" ? undefined : tab,
          page,
          pageSize: PAGE_SIZE,
        });

        if (ignore) return;

        setOrders(result.orders);
        setTotalPages(Math.max(1, result.totalPages));
        setTotalRecords(result.totalRecords);
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : "Failed to load orders.",
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    void loadOrders();

    return () => {
      ignore = true;
    };
  }, [tab, page, retry]);

  const visibleOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) =>
      String(order.orderId).toLowerCase().includes(query),
    );
  }, [orders, search]);

  function selectTab(value: string) {
    setTab(value);
    setPage(1);
    setSearch("");
    setLoading(true);
    setMessage("");
    setError("");
    setExpandedId(null);
  }

  async function toggleDetails(orderId: number) {
    if (expandedId === orderId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(orderId);

    if (details[orderId]) return;

    try {
      setDetailsLoading(true);
      setError("");

      const result = await getOrderById(orderId);

      setDetails((previous) => ({
        ...previous,
        [orderId]: result,
      }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load order details.",
      );
    } finally {
      setDetailsLoading(false);
    }
  }

  async function handleReorder(orderId: number) {
    try {
      setBusyId(orderId);
      setMessage("");
      setError("");

      await reorderOrder(orderId);

      const refreshed = await fetchCart();

      setMessage(
        refreshed
          ? `Order #${orderId} was added to your cart.`
          : `Order #${orderId} was reordered, but your cart could not refresh. Please open the cart again.`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reorder failed.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-7 flex flex-col justify-between gap-5 rounded-3xl bg-gradient-to-r from-gray-950 to-orange-950 p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Your shopping journey
            </p>

            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              My Orders<span className="text-orange-500">.</span>
            </h1>

            <p className="mt-2 text-sm text-gray-300">
              Track purchases and revisit your order details.
            </p>
          </div>

          <Link
            to="/products"
            className="rounded-xl bg-orange-500 px-5 py-3 text-center text-sm font-bold hover:bg-orange-400"
          >
            Continue Shopping →
          </Link>
        </header>

        <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold">Your purchases</h2>
              <p className="text-sm text-gray-500">{totalRecords} orders</p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search order number..."
              aria-label="Search by order number"
              className="min-h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:w-64"
            />
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {TABS.map((value) => (
              <Button
                key={value}
                type="button"
                variant={
                  tab === value ? ButtonVariant.Primary : ButtonVariant.Compact
                }
                onClick={() => selectTab(value)}
                aria-pressed={tab === value}
                className={`!w-auto !shrink-0 !rounded-xl !px-4 !py-2.5 !text-sm !font-semibold ${
                  tab === value
                    ? ""
                    : "!bg-gray-100 !text-gray-600 hover:!bg-orange-50"
                }`}
              >
                {value}
              </Button>
            ))}
          </div>
        </section>

        {message && (
          <div
            role="status"
            className="mb-4 rounded-xl bg-green-50 p-4 text-sm text-green-800"
          >
            {message}{" "}
            <Link to="/cart" className="font-bold underline">
              View Cart
            </Link>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}

            <Button
              type="button"
              variant={ButtonVariant.Compact}
              onClick={() => {
                setLoading(true);
                setError("");
                setRetry((value) => value + 1);
              }}
              className="!ml-3 !w-auto !rounded-md !px-2 !py-1 !font-bold !underline"
            >
              Try again
            </Button>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border bg-white p-6"
              >
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="mt-4 h-3 w-56 rounded bg-gray-100" />
                <div className="mt-6 h-16 rounded-xl bg-gray-100" />
              </div>
            ))}
          </div>
        ) : !error && visibleOrders.length === 0 ? (
          <section className="rounded-2xl border bg-white px-6 py-14 text-center">
            <div className="text-4xl" aria-hidden="true">
              🛍️
            </div>

            <h2 className="mt-4 text-xl font-bold">
              {search
                ? "No matching orders"
                : tab === "All Orders"
                  ? "No orders yet. Start shopping!"
                  : "No orders found"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {search
                ? "Try a different order number."
                : "Your orders will appear here when you shop with us."}
            </p>

            {search ? (
              <Button
                type="button"
                variant={ButtonVariant.Compact}
                onClick={() => setSearch("")}
                className="!mt-4 !w-auto !px-2 !py-1 !font-bold !text-orange-600"
              >
                Clear search
              </Button>
            ) : (
              <Link
                to="/products"
                className="mt-5 inline-block rounded-xl bg-orange-500 px-5 py-3 font-bold text-white"
              >
                Explore Products
              </Link>
            )}
          </section>
        ) : (
          <div className="space-y-4">
            {visibleOrders.map((order) => {
              const detail = details[order.orderId];
              const itemCount = getOrderItemCount(detail);

              return (
                <article
                  key={order.orderId}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-orange-200 hover:shadow-md"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-extrabold">
                            Order #{order.orderId}
                          </h3>

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
                          Placed on {date(order.createdAt)}
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
                        <p className="mt-1 font-bold">
                          {money(order.subtotal)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Shipping</p>
                        <p className="mt-1 font-bold">
                          {money(order.shippingCharge)}
                        </p>
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
                        onClick={() => void toggleDetails(order.orderId)}
                        className="!w-auto !rounded-xl !px-4 !py-2.5 !text-sm !font-bold"
                      >
                        {expandedId === order.orderId
                          ? "Hide Details"
                          : "View Details"}
                      </Button>

                      {/* Reorder is available for every order status. */}
                      <Button
                        type="button"
                        variant={ButtonVariant.Secondary}
                        disabled={busyId === order.orderId}
                        onClick={() => void handleReorder(order.orderId)}
                        className="!w-auto !rounded-xl !bg-gray-900 !px-4 !py-2.5 !text-sm !font-bold !text-white hover:!bg-orange-600 disabled:!opacity-50"
                      >
                        {busyId === order.orderId ? "Adding..." : "Reorder"}
                      </Button>
                    </div>

                    {expandedId === order.orderId && (
                      <div className="mt-5 border-t border-gray-100 pt-5">
                        {detailsLoading && !detail ? (
                          <p className="text-sm text-gray-500">
                            Loading details...
                          </p>
                        ) : detail ? (
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
                                      <p className="font-semibold">
                                        {item.productName}
                                      </p>

                                      <p className="mt-1 text-gray-500">
                                        Qty {item.quantity} ×{" "}
                                        {money(item.price)}
                                      </p>
                                    </div>

                                    <p className="font-bold">
                                      {money(item.itemSubtotal)}
                                    </p>
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
                                  {detail.shipping.shippingCity},{" "}
                                  {detail.shipping.shippingState}{" "}
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
                                  ? `${
                                      detail.payment.paymentMethod ?? "Payment"
                                    } · ${
                                      detail.payment.paymentStatus ??
                                      "Status unavailable"
                                    }`
                                  : "No payment information available."}
                              </p>

                              {detail.payment?.transactionReference && (
                                <p className="mt-1 break-all text-xs text-gray-500">
                                  Reference:{" "}
                                  {detail.payment.transactionReference}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && !error && !search && totalPages > 1 && (
          <nav
            aria-label="Order pages"
            className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white p-4"
          >
            <p className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                variant={ButtonVariant.Outline}
                disabled={page === 1}
                onClick={() => {
                  setLoading(true);
                  setPage((value) => value - 1);
                }}
                className="!w-auto !rounded-xl !border !px-4 !py-2 !text-sm !font-semibold disabled:!opacity-40"
              >
                Previous
              </Button>

              <Button
                type="button"
                variant={ButtonVariant.Outline}
                disabled={page >= totalPages}
                onClick={() => {
                  setLoading(true);
                  setPage((value) => value + 1);
                }}
                className="!w-auto !rounded-xl !border !px-4 !py-2 !text-sm !font-semibold disabled:!opacity-40"
              >
                Next
              </Button>
            </div>
          </nav>
        )}
      </div>
    </main>
  );
}

export default Orders;
