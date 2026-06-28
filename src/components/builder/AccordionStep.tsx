import "./AccordionStep.css";
// import './ProductCard.css';

import { Step } from "../../types";
import { useBundleContext } from "../../context/BundleContext";
import { ProductCard } from "./ProductCard";

interface AccordionStepProps {
  step: Step;
  stepIndex: number;
}

const stepIconPaths: Record<string, string> = {
  cameras: "/icons/icon-camera.svg",
  plan: "/icons/icon-shield.svg",
  sensors: "/icons/icon-sensor.svg",
  protection: "/icons/icon-lock.svg",
};

export function AccordionStep({ step, stepIndex }: AccordionStepProps) {
  const { activeStep, setActiveStep, selections } = useBundleContext();

  const isOpen = activeStep === stepIndex;

  // Count distinct products with any qty > 0 in this step
  const selectedCount = step.products.reduce((count, product) => {
    const hasSelection =
      product.variants.length > 0
        ? product.variants.some((v) => (selections[v.id] ?? 0) > 0)
        : (selections[product.id] ?? 0) > 0;
    return hasSelection ? count + 1 : count;
  }, 0);

  const handleNext = () => {
    setActiveStep(stepIndex + 1);
  };

  return (
    <div className={`accordion-step ${isOpen ? "accordion-step--open" : ""}`}>
      {/* Header */}
      {/* <button
        className="accordion-step__header"
        onClick={() => setActiveStep(isOpen ? -1 : stepIndex)}
        aria-expanded={isOpen}
      >
        <div className="accordion-step__header-left">
          <span className="accordion-step__step-label">
            STEP {step.stepNumber} OF 4
          </span>
          <div className="accordion-step__title-row">
           
            <span className="accordion-step__icon">
              <img
                src={stepIconPaths[step.id]}
                alt={step.label}
                width={26}
                height={26}
              />
            </span>
            <span className="accordion-step__title">{step.label}</span>
          </div>
        </div>

        <div className="accordion-step__header-right">
          {selectedCount > 0 && (
            <span className="accordion-step__count">
              {selectedCount} selected
            </span>
          )}
          <span className="accordion-step__chevron">{isOpen ? "▲" : "▼"}</span>
        </div>
      </button> */}
      <button
  className="accordion-step__header"
  onClick={() => setActiveStep(isOpen ? -1 : stepIndex)}
  aria-expanded={isOpen}
>
  <span className="accordion-step__step-label">
    STEP {step.stepNumber} OF 4
  </span>

  <div className="accordion-step__header-box">
    <div className="accordion-step__header-left">
      <div className="accordion-step__title-row">
        <span className="accordion-step__icon">
          <img
            src={stepIconPaths[step.id]}
            alt={step.label}
            width={26}
            height={26}
          />
        </span>

        <span className="accordion-step__title">
          {step.label}
        </span>
      </div>
    </div>

    <div className="accordion-step__header-right">
      {selectedCount > 0 && (
        <span className="accordion-step__count">
          {selectedCount} selected
        </span>
      )}
      <span className="accordion-step__chevron">
        {isOpen ? "▲" : "▼"}
      </span>
    </div>
  </div>
</button>

      {/* Body */}
      {isOpen && (
        <div className="accordion-step__body">
          <div className="accordion-step__products">
            {step.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {step.nextLabel && (
            <button className="accordion-step__next" onClick={handleNext}>
              {step.nextLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
