import { useState, type ChangeEvent } from "react";
import Button from "../Common/Button";
import { ButtonVariant } from "../../enums/button";

interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onChange: (quantity: number) => void;
}

function QuantitySelector({
  quantity,
  min = 1,
  max,
  onChange,
}: QuantitySelectorProps) {
  const [inputValue, setInputValue] = useState(String(quantity));

  const safeValue = (value: number) => {
    if (Number.isNaN(value)) {
      return min;
    }

    if (max !== undefined) {
      return Math.min(Math.max(value, min), max);
    }

    return Math.max(value, min);
  };

  const increase = () => {
    const nextValue = safeValue(quantity + 1);

    if (nextValue === quantity) {
      return;
    }

    setInputValue(String(nextValue));
    onChange(nextValue);
  };

  const decrease = () => {
    const nextValue = safeValue(quantity - 1);

    if (nextValue === quantity) {
      return;
    }

    setInputValue(String(nextValue));
    onChange(nextValue);
  };

  const finalizeInputValue = () => {
    const parsed = Number(inputValue);

    if (inputValue === "" || !Number.isFinite(parsed)) {
      const resetValue = min;

      setInputValue(String(resetValue));
      onChange(resetValue);

      return;
    }

    const nextValue = safeValue(parsed);

    setInputValue(String(nextValue));
    onChange(nextValue);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    if (rawValue === "") {
      setInputValue("");
      return;
    }

    const parsed = Number(rawValue);

    if (!Number.isFinite(parsed)) {
      return;
    }

    setInputValue(rawValue);
    onChange(safeValue(parsed));
  };

  return (
    <div className="my-1 flex items-center gap-1">
      <Button
        type="button"
        variant={ButtonVariant.QuantityAction}
        onClick={decrease}
        disabled={quantity <= min}
        ariaLabel="Decrease quantity"
        className="!h-7 !w-7 !rounded border border-gray-200 disabled:opacity-40"
      >
        −
      </Button>

      <input
        type="number"
        value={inputValue}
        min={min}
        max={max}
        onChange={handleInputChange}
        onBlur={finalizeInputValue}
        aria-label="Quantity"
        className="h-9 w-14 rounded border border-gray-300 text-center text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
      />

      <Button
        type="button"
        variant={ButtonVariant.QuantityAction}
        onClick={increase}
        disabled={max !== undefined && quantity >= max}
        ariaLabel="Increase quantity"
        className="!h-7 !w-7 !rounded border border-gray-200 disabled:opacity-40"
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;
