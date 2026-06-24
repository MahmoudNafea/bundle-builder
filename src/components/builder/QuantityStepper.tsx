interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max,
}: QuantityStepperProps) {
  return (
    <div className="stepper">
      <button
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span>{value}</span>
      <button
        onClick={onIncrement}
        disabled={max !== undefined && value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}