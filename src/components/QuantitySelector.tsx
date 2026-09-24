import { useEffect, useState, type ChangeEvent } from "react";

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

  useEffect(() => {
    setInputValue(String(quantity));
  }, [quantity]);

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

    onChange(nextValue);
  };

  const decrease = () => {
    const nextValue = safeValue(quantity - 1);
    if (nextValue === quantity) {
      return;
    }

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
      <button
        onClick={decrease}
        disabled={quantity <= min}
        className="h-7 w-7 rounded border disabled:opacity-40"
      >
        −
      </button>

      <input
        type="number"
        value={inputValue}
        min={min}
        max={max}
        onChange={handleInputChange}
        onBlur={finalizeInputValue}
        className="w-14 border-y border-gray-300 text-center outline-none"
      />

      <button
        onClick={increase}
        disabled={max !== undefined && quantity >= max}
        className="h-7 w-7 rounded border disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
