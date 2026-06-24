import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Selections, ActiveVariants } from '../types';

interface BundleContextValue {
  selections: Selections;
  activeStep: number;
  activeVariants: ActiveVariants;
  setActiveStep: (step: number) => void;
  setQty: (variantId: string, qty: number) => void;
  getQty: (variantId: string) => number;
  setActiveVariants: React.Dispatch<React.SetStateAction<ActiveVariants>>;
}

const BundleContext = createContext<BundleContextValue | null>(null);

export function BundleProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<Selections>({});
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeVariants, setActiveVariants] = useState<ActiveVariants>({});

  const setQty = (variantId: string, qty: number) =>
    setSelections(prev => ({ ...prev, [variantId]: Math.max(0, qty) }));

  const getQty = (variantId: string): number => selections[variantId] ?? 0;

  return (
    <BundleContext.Provider value={{
      selections, activeStep, activeVariants,
      setActiveStep, setQty, getQty, setActiveVariants
    }}>
      {children}
    </BundleContext.Provider>
  );
}

export function useBundleContext(): BundleContextValue {
  const ctx = useContext(BundleContext);
  if (!ctx) throw new Error('useBundleContext must be used inside BundleProvider');
  return ctx;
}