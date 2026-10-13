interface CheckoutStepsProps {
  activeStep: 1 | 2 | 3;
}

const steps = ["Shipping", "Payment", "Review"] as const;

function CheckoutSteps({ activeStep }: CheckoutStepsProps) {
  return (
    <nav
      aria-label="Checkout progress"
      className="mb-6 flex items-center justify-center gap-2"
    >
      {steps.map((step, index) => {
        const stepNumber = (index + 1) as 1 | 2 | 3;
        const isActive = stepNumber === activeStep;
        const isComplete = stepNumber < activeStep;

        return (
          <div key={step} className="flex min-w-0 flex-1 items-center gap-2">
            <div
              aria-current={isActive ? "step" : undefined}
              className={`flex h-9 min-w-0 flex-1 items-center justify-center rounded-full px-2 text-xs font-bold sm:px-4 ${
                isActive
                  ? "bg-orange-500 text-white"
                  : isComplete
                    ? "bg-orange-100 text-orange-800"
                    : "bg-gray-300 text-gray-800"
              }`}
            >
              {stepNumber}. {step}
            </div>

            {index < steps.length - 1 && (
              <div className="h-px w-3 shrink-0 bg-gray-300 sm:w-8" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default CheckoutSteps;
