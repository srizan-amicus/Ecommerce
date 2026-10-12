import { Link } from "react-router-dom";

function Orders() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

      <p className="mt-3 text-gray-600">Your placed orders will appear here.</p>

      <Link
        to="/products"
        className="mt-6 inline-block rounded bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
      >
        Browse Products
      </Link>
    </main>
  );
}

export default Orders;
