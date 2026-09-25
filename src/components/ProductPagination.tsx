function ProductPagination() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
      <button className="rounded-md px-3 py-2 text-orange-500 hover:bg-orange-50">
        &lt; Previous
      </button>

      <button className="rounded-md bg-orange-500 px-3 py-2 font-medium text-white">
        1
      </button>

      <button className="rounded-md px-3 py-2 hover:bg-gray-100">2</button>

      <button className="rounded-md px-3 py-2 hover:bg-gray-100">3</button>

      <button className="rounded-md px-3 py-2 hover:bg-gray-100">4</button>

      <button className="rounded-md px-3 py-2 hover:bg-gray-100">5</button>

      <button className="rounded-md px-3 py-2 text-orange-500 hover:bg-orange-50">
        Next &gt;
      </button>
    </div>
  );
}

export default ProductPagination;
