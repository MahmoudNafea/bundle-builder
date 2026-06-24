import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Selections, ActiveVariants } from '../types';

interface BundleContextValue {
  selections: Selections;
  activeStep: number;
  activeVariants: ActiveVariants;
  setActiveStep: (step: number) => void;
  setQty: (variantId: string, qty: number) => void;
  getQty: (variantId: string) => number;
  setActiveVariants: React.Dispatch<React.SetStateAction<ActiveVariants>>;
  saveSystem: () => void;
}

const BundleContext = createContext<BundleContextValue | null>(null);

const STORAGE_KEY = 'bundle-system';

const getInitialSelections = (): Selections => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved) as Selections;
  // Default selections matching Figma
  return {
    'wyze-cam-v4-white': 1,
    'wyze-cam-pan-v3-white': 2,
    'wyze-sense-motion-sensor': 2,
    'wyze-sense-hub': 1,
    'wyze-microsd-card': 2,
    'cam-unlimited': 1,
  };
};

export function BundleProvider({ children }: { children: ReactNode }) {
  // const [selections, setSelections] = useState<Selections>({});
    const [selections, setSelections] = useState<Selections>(getInitialSelections);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeVariants, setActiveVariants] = useState<ActiveVariants>({});

  // Restore saved system on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSelections(JSON.parse(saved) as Selections);
    }
  }, []);

  const setQty = (variantId: string, qty: number) => {
    setSelections(prev => ({
      ...prev,
      [variantId]: Math.max(0, qty),
    }));
  };

  const getQty = (variantId: string): number =>
    selections[variantId] ?? 0;

  const saveSystem = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
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