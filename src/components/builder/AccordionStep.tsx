import './AccordionStep.css';
// import './ProductCard.css'; 

import { Step } from '../../types';
import { useBundleContext } from '../../context/BundleContext';
import { ProductCard } from './ProductCard';
 


interface AccordionStepProps {
  step: Step;
  stepIndex: number;
}

const stepIcons: Record<string, string> = {
  cameras: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
  plan: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  sensors: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 000 11.4M17.7 6.3a8 8 0 010 11.4"/></svg>`,
  protection: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
};

export function AccordionStep({ step, stepIndex }: AccordionStepProps) {
  const { activeStep, setActiveStep, selections } = useBundleContext();

  const isOpen = activeStep === stepIndex;

  // Count distinct products with any qty > 0 in this step
  const selectedCount = step.products.reduce((count, product) => {
    const hasSelection =
      product.variants.length > 0
        ? product.variants.some(v => (selections[v.id] ?? 0) > 0)
        : (selections[product.id] ?? 0) > 0;
    return hasSelection ? count + 1 : count;
  }, 0);

  const handleNext = () => {
    setActiveStep(stepIndex + 1);
  };

return (
  <div className={`accordion-step ${isOpen ? 'accordion-step--open' : ''}`}>

    {/* Header */}
    <button
      className="accordion-step__header"
      onClick={() => setActiveStep(isOpen ? -1 : stepIndex)}
      aria-expanded={isOpen}
    >
      <div className="accordion-step__header-left">
        <span className="accordion-step__step-label">
          STEP {step.stepNumber} OF 4
        </span>
        <div className="accordion-step__title-row">
          <span
            className="accordion-step__icon"
            dangerouslySetInnerHTML={{ __html: stepIcons[step.id] }}
          />
          <span className="accordion-step__title">{step.label}</span>
        </div>
      </div>

      <div className="accordion-step__header-right">
        {selectedCount > 0 && (
          <span className="accordion-step__count">
            {selectedCount} selected
          </span>
        )}
        <span className="accordion-step__chevron">
          {isOpen ? '▲' : '▼'}
        </span>
      </div>
    </button>

    {/* Body */}
    {isOpen && (
      <div className="accordion-step__body">
        <div className="accordion-step__products">
          {step.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {step.nextLabel && (
          <button
            className="accordion-step__next"
            onClick={handleNext}
          >
            {step.nextLabel}
          </button>
        )}
      </div>
    )}

  </div>
);
}