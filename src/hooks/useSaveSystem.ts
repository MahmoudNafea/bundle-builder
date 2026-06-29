import { Selections } from '../types';

const STORAGE_KEY = 'bundle-system';

export function useSaveSystem() {
  const save = (selections: Selections): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
  };

  const restore = (): Selections | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Selections) : null;
    } catch {
      return null;
    }
  };

  const clear = (): void => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return { save, restore, clear };
}