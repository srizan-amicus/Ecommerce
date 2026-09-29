function CheckoutSteps() {
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      <div className="flex h-7 w-48 items-center rounded-full bg-orange-500 px-4 text-xs font-bold text-white">
        1. Shipping
      </div>

      <div className="h-px w-12 bg-gray-300" />

      <div className="flex h-7 w-48 items-center rounded-full bg-gray-300 px-4 text-xs font-bold text-gray-800">
        2. Payment
      </div>

      <div className="h-px w-12 bg-gray-300" />

      <div className="flex h-7 w-48 items-center rounded-full bg-gray-300 px-4 text-xs font-bold text-gray-800">
        3. Review
      </div>
    </div>
  );
}

export default CheckoutSteps;
