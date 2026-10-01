function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-6xl">🔍</div>

      <h2 className="text-lg font-semibold text-gray-800">No products found</h2>

      <p className="mt-2 text-sm text-gray-500">
        Try changing your search or filter options.
      </p>
    </div>
  );
}

export default EmptyState;
