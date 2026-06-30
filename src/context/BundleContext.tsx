import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { Selections, ActiveVariants } from '../types';
import { useSaveSystem } from '../hooks/useSaveSystem';

interface BundleContextValue {
  selections: Selections;
  activeStep: number;
  activeVariants: ActiveVariants;
  setActiveStep: (step: number) => void;
  setQty: (variantId: string, qty: number) => void;
  getQty: (variantId: string) => number;
  setActiveVariants: React.Dispatch<React.SetStateAction<ActiveVariants>>;
  saveSystem: () => boolean;
}

const BundleContext = createContext<BundleContextValue | null>(null);

const DEFAULT_SELECTIONS: Selections = {
  'wyze-cam-v4-white': 1,
  'wyze-cam-pan-v3-white': 2,
  'wyze-sense-motion-sensor': 2,
  'wyze-sense-hub': 1,
  'wyze-microsd-card': 2,
  'cam-unlimited': 1,
};

export function BundleProvider({ children }: { children: ReactNode }) {
  const { save, restore } = useSaveSystem();

  const [selections, setSelections] = useState<Selections>(
    () => restore() ?? DEFAULT_SELECTIONS
  );
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeVariants, setActiveVariants] = useState<ActiveVariants>({});

  const setQty = (variantId: string, qty: number) => {
    setSelections(prev => ({
      ...prev,
      [variantId]: Math.max(0, qty),
    }));
  };

  const getQty = (variantId: string): number =>
    selections[variantId] ?? 0;

const saveSystem = (): boolean => {
  try {
    save(selections);
    return true;
  } catch {
    return false;
  }
};
  return (
    <BundleContext.Provider
      value={{
        selections,
        activeStep,
        activeVariants,
        setActiveStep,
        setQty,
        getQty,
        setActiveVariants,
        saveSystem,
      }}
    >
      {children}
    </BundleContext.Provider>
  );
}

export function useBundleContext(): BundleContextValue {
  const ctx = useContext(BundleContext);
  if (!ctx) throw new Error('useBundleContext must be used inside BundleProvider');
  return ctx;
}