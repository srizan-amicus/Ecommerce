function ProductSkeleton() {
  return (
    <article className="overflow-hidden rounded-lg border border-orange-100 bg-white shadow-sm">
      <div className="skeleton h-40" />

      <div className="space-y-3 p-3">
        <div className="skeleton h-4 rounded" />

        <div className="skeleton h-3 w-1/2 rounded" />

        <div className="skeleton h-3 w-2/3 rounded" />

        <div className="skeleton h-8 rounded" />

        <div className="skeleton h-9 rounded" />
      </div>
    </article>
  );
}

export default ProductSkeleton;