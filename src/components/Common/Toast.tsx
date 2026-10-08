import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onClose();
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      className="fixed right-5 top-5 z-50 flex items-center gap-3 rounded-lg bg-orange-500 px-5 py-3 text-sm font-medium text-white shadow-lg"
    >
      <span className="text-lg">✓</span>

      <span>{message}</span>

      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-lg leading-none hover:text-green-100"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
