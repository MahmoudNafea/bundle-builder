import { Product } from '../../types';
import { useBundleContext } from '../../context/BundleContext';
import { VariantSelector } from './VariantSelector';
import { QuantityStepper } from './QuantityStepper';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { getQty, setQty, activeVariants } = useBundleContext();

  // If product has variants, stepper binds to active variant
  // If no variants, stepper binds to product id directly
  const activeVariantId =
    product.variants.length > 0
      ? (activeVariants[product.id] ?? product.variants[0].id)
      : product.id;

  const qty = getQty(activeVariantId);
  const isSelected = product.variants.length > 0
    ? product.variants.some(v => getQty(v.id) > 0)
    : qty > 0;

  return (
    <div className={`product-card ${isSelected ? 'product-card--selected' : ''}`}>

      {/* Badge */}
      {product.badge && (
        <span className="product-card__badge">{product.badge}</span>
      )}

      {/* Image */}
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
        />
      </div>

      {/* Info */}
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        
         <a href={product.learnMoreUrl}
          className="product-card__learn-more"
          target="_blank"
          rel="noreferrer"
        >
          Learn More
        </a>
      </div>

      {/* Variant selector — only if variants exist */}
      {product.variants.length > 0 && (
        <VariantSelector
          productId={product.id}
          variants={product.variants}
        />
      )}

      {/* Stepper + Pricing row */}
      <div className="product-card__footer">
        <QuantityStepper
          value={qty}
          onIncrement={() => setQty(activeVariantId, qty + 1)}
          onDecrement={() => setQty(activeVariantId, qty - 1)}
        />

        <div className="product-card__pricing">
          {product.isFree ? (
            <span className="product-card__price-free">FREE</span>
          ) : (
            <>
              {product.comparePrice != null && (
                <span className="product-card__compare-price">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
              <span className="product-card__price">
                ${product.price.toFixed(2)}
                {product.priceLabel && (
                  <span className="product-card__price-label">
                    {product.priceLabel}
                  </span>
                )}
              </span>
            </>
          )}
        </div>
      </div>

    </div>
  );
}