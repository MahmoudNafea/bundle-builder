import { Step } from '../../types';
import { AccordionStep } from './AccordionStep';
import './BuilderPanel.css';

interface BuilderPanelProps {
  steps: Step[];
}

export function BuilderPanel({ steps }: BuilderPanelProps) {
  return (
    <div className="builder-panel">
      {steps.map((step, index) => (
        <AccordionStep
          key={step.id}
          step={step}
          stepIndex={index}
        />
      ))}
    </div>
  );
}