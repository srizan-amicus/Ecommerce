interface OrderSuccessToastProps {
  orderId: number;
}

function OrderSuccessToast({ orderId }: OrderSuccessToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 top-5 z-[100] w-[calc(100%-2rem)] max-w-sm animate-[toast-in_300ms_ease-out] overflow-hidden rounded-2xl border border-white/10 bg-gray-950 text-white shadow-2xl"
    >
      <div className="flex items-start gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d="m5 12 4 4L19 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold tracking-tight">
            Order placed successfully!
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Order #{orderId} is confirmed. Thanks for shopping with us.
          </p>
        </div>

        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
      </div>

      <div className="h-1 bg-white/10">
        <div className="h-full origin-left animate-[toast-progress_3s_linear_forwards] bg-orange-500" />
      </div>
    </div>
  );
}

export default OrderSuccessToast;
