import { useEffect } from "react";
import Button from "./Button";
import { ButtonVariant } from "../../enums/button";

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
      <span className="text-lg" aria-hidden="true">
        ✓
      </span>

      <span>{message}</span>

      <Button
        type="button"
        variant={ButtonVariant.Compact}
        onClick={onClose}
        ariaLabel="Close notification"
        className="!ml-2 !h-8 !min-h-8 !w-8 !min-w-0 !rounded-md !px-0 !py-0 !text-lg !leading-none !text-white hover:!bg-orange-600"
      >
        ×
      </Button>
    </div>
  );
}

export default Toast;
