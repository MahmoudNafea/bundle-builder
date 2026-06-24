import { Variant } from '../../types';
import { useBundleContext } from '../../context/BundleContext';

interface VariantSelectorProps {
  productId: string;
  variants: Variant[];
}

export function VariantSelector({ productId, variants }: VariantSelectorProps) {
  const { activeVariants, setActiveVariants } = useBundleContext();

  const activeVariantId = activeVariants[productId] ?? variants[0]?.id;

  const handleSelect = (variantId: string) => {
    setActiveVariants(prev => ({ ...prev, [productId]: variantId }));
  };

  if (variants.length === 0) return null;

  return (
    <div className="variant-selector">
      {variants.map(variant => (
        <button
          key={variant.id}
          className={`variant-chip ${activeVariantId === variant.id ? 'variant-chip--active' : ''}`}
          onClick={() => handleSelect(variant.id)}
          aria-label={variant.label}
          title={variant.label}
        >
          <span
            className="variant-chip__swatch"
            style={{ backgroundColor: variant.color }}
          />
          <span className="variant-chip__label">{variant.label}</span>
        </button>
      ))}
    </div>
  );
}