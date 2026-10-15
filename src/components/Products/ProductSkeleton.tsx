function ProductCardSkeleton() {
  return (
    <article
      aria-label="Loading product"
      aria-busy="true"
      className="flex h-full flex-col border border-gray-300 bg-white p-2"
    >
      {/* Product image placeholder */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-md bg-gray-50 p-3">
        <div className="h-full w-full animate-pulse rounded-md bg-gray-200" />
      </div>

      {/* Product information placeholders */}
      <div className="flex flex-1 flex-col p-2">
        {/* Product name */}
        <div className="flex min-h-[48px] items-start justify-center">
          <div className="mt-2 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Price */}
        <div className="mt-2 flex justify-center">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Rating */}
        <div className="mt-1 flex items-center justify-center gap-1">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Quantity selector */}
        <div className="mt-2 flex items-center justify-center gap-1">
          <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
          <div className="h-11 w-[70px] animate-pulse rounded-md bg-gray-200" />
          <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Total */}
        <div className="mt-1 flex justify-center">
          <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Add to Cart button */}
        <div className="mt-2 h-10 w-full animate-pulse rounded-md bg-gray-200" />
      </div>
    </article>
  );
}

export default ProductCardSkeleton;
