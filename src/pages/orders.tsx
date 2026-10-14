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
import OrderCard from "../components/Orders/OrderCard";
import { ButtonVariant } from "../enums/button";

const PAGE_SIZE = 8;

const TABS = ["All Orders", "Processing", "Shipped", "Delivered", "Cancelled"];

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
        if (!ignore) {
          setLoading(false);
        }
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
            {visibleOrders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                detail={details[order.orderId]}
                isExpanded={expandedId === order.orderId}
                isDetailsLoading={detailsLoading}
                isReordering={busyId === order.orderId}
                onToggleDetails={(orderId) => void toggleDetails(orderId)}
                onReorder={(orderId) => void handleReorder(orderId)}
              />
            ))}
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
