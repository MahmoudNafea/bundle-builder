import { useBundleContext } from '../../context/BundleContext';
import { Step } from '../../types';
import { QuantityStepper } from '../builder/QuantityStepper';
import './ReviewPanel.css';

interface ReviewPanelProps {
  steps: Step[];
}

export function ReviewPanel({ steps }: ReviewPanelProps) {
  const { selections, setQty, saveSystem } = useBundleContext();

  // Build line items from selections
  const lineItems = steps.flatMap(step =>
    step.products.flatMap(product => {
      if (product.variants.length > 0) {
        // One line per variant that has qty > 0
        return product.variants
          .filter(v => (selections[v.id] ?? 0) > 0)
          .map(v => ({
            key: v.id,
            name: `${product.name} (${v.label})`,
            image: product.image,
            price: product.price,
            comparePrice: product.comparePrice,
            isFree: product.isFree,
            priceLabel: product.priceLabel,
            qty: selections[v.id] ?? 0,
            variantId: v.id,
            category: step.id,
          }));
      } else {
        const qty = selections[product.id] ?? 0;
        if (qty === 0) return [];
        return [{
          key: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          comparePrice: product.comparePrice,
          isFree: product.isFree,
          priceLabel: product.priceLabel,
          qty,
          variantId: product.id,
          category: step.id,
        }];
      }
    })
  );

  // Group by category
  const grouped = steps.map(step => ({
    step,
    items: lineItems.filter(item => item.category === step.id),
  })).filter(group => group.items.length > 0);

  // Totals
  const total = lineItems.reduce((sum, item) =>
    sum + (item.isFree ? 0 : item.price * item.qty), 0);
  const compareTotal = lineItems.reduce((sum, item) =>
    sum + ((item.comparePrice ?? item.price) * item.qty), 0);
  const savings = compareTotal - total;

  const handleCheckout = () => {
    alert('Order placed! Thank you for your purchase.');
  };

  return (
    <div className="review-panel">
      <h2 className="review-panel__title">Your security system</h2>
      <p className="review-panel__subtitle">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      {lineItems.length === 0 ? (
        <p className="review-panel__empty">
          Add products from the builder to see your system here.
        </p>
      ) : (
        <>
          {/* Line items grouped by category */}
          {grouped.map(({ step, items }) => (
            <div key={step.id} className="review-group">
              <h3 className="review-group__label">{step.label}</h3>
              {items.map(item => (
                <div key={item.key} className="review-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="review-item__image"
                  />
                  <span className="review-item__name">{item.name}</span>
                  <div className="review-item__stepper">
                    <QuantityStepper
                      value={item.qty}
                      onIncrement={() => setQty(item.variantId, item.qty + 1)}
                      onDecrement={() => setQty(item.variantId, item.qty - 1)}
                    />
                  </div>
                  <div className="review-item__pricing">
                    {item.isFree ? (
                      <span className="review-item__free">FREE</span>
                    ) : (
                      <>
                        {item.comparePrice != null && (
                          <span className="review-item__compare">
                            ${(item.comparePrice * item.qty).toFixed(2)}
                          </span>
                        )}
                        <span className="review-item__price">
                          ${(item.price * item.qty).toFixed(2)}
                          {item.priceLabel && (
                            <span className="review-item__price-label">
                              {item.priceLabel}
                            </span>
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Shipping */}
          <div className="review-shipping">
            <span>Fast Shipping</span>
            <span className="review-shipping__free">FREE</span>
          </div>

          {/* Total */}
          <div className="review-total">
            <div className="review-total__row">
              <span>Total</span>
              <div className="review-total__prices">
                {savings > 0 && (
                  <span className="review-total__compare">
                    ${compareTotal.toFixed(2)}
                  </span>
                )}
                <span className="review-total__price">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            {savings > 0 && (
              <p className="review-total__savings">
                Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
              </p>
            )}
          </div>

          {/* Checkout */}
          <button
            className="review-checkout"
            onClick={handleCheckout}
          >
            Checkout
          </button>

          {/* Save */}
          <button
            className="review-save"
            onClick={saveSystem}
          >
            Save my system for later
          </button>
        </>
      )}
    </div>
  );
}