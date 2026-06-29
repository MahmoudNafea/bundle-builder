import { useBundleContext } from '../../context/BundleContext';
import { Step } from '../../types';
import { QuantityStepper } from '../builder/QuantityStepper';
import './ReviewPanel.css';

interface ReviewPanelProps {
  steps: Step[];
}

const categoryLabels: Record<string, string> = {
  cameras: 'CAMERAS',
  plan: 'PLAN',
  sensors: 'SENSORS',
  protection: 'ACCESSORIES',
};

export function ReviewPanel({ steps }: ReviewPanelProps) {
  const { selections, setQty, saveSystem } = useBundleContext();

  const lineItems = steps.flatMap(step =>
    step.products.flatMap(product => {
      if (product.id === 'cam-unlimited') return [];
      if (product.variants.length > 0) {
        return product.variants
          .filter(v => (selections[v.id] ?? 0) > 0)
          .map(v => ({
            key: v.id,
            name: `${product.name} (${v.label})`,
            image: product.image,
            price: product.price,
            comparePrice: product.comparePrice,
            isFree: product.isFree ?? false,
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
          isFree: product.isFree ?? false,
          qty,
          variantId: product.id,
          category: step.id,
        }];
      }
    })
  );

  const grouped = steps
    .filter(step => step.id !== 'plan')
    .map(step => ({
      step,
      items: lineItems.filter(item => item.category === step.id),
    }))
    .filter(group => group.items.length > 0);

  const planQty = selections['cam-unlimited'] ?? 0;

  const total = lineItems.reduce((sum, item) =>
    sum + (item.isFree ? 0 : item.price * item.qty), 0)
    + (planQty > 0 ? 9.99 : 0);

  const compareTotal = lineItems.reduce((sum, item) =>
    sum + ((item.comparePrice ?? item.price) * item.qty), 0)
    + (planQty > 0 ? 12.99 : 0);

  const savings = compareTotal - total;

  const isEmpty = lineItems.length === 0 && planQty === 0;

  return (
    <div className="review-panel">

      {/* Top header */}
      <div className="review-panel__top">
        <p className="review-panel__review-label">REVIEW</p>
        <h2 className="review-panel__title">Your security system</h2>
        <p className="review-panel__subtitle">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {isEmpty ? (
        <p className="review-panel__empty">
          Add products from the builder to see your system here.
        </p>
      ) : (
        <div className="review-panel__body">

          {/* Left — line items */}
          <div className="review-panel__items">

            {grouped.map(({ step, items }) => (
              <div key={step.id} className="review-group">
                <span className="review-group__label">
                  {categoryLabels[step.id]}
                </span>
                {items.map(item => (
                  <div key={item.key} className="review-item">
                    <img src={item.image} alt={item.name} className="review-item__image" />
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
                        <>
                          {item.comparePrice != null && (
                            <span className="review-item__compare">
                              ${(item.comparePrice * item.qty).toFixed(2)}
                            </span>
                          )}
                          <span className="review-item__free">FREE</span>
                        </>
                      ) : (
                        <>
                          {item.comparePrice != null && (
                            <span className="review-item__compare">
                              ${(item.comparePrice * item.qty).toFixed(2)}
                            </span>
                          )}
                          <span className="review-item__price">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Plan */}
            {planQty > 0 && (
              <div className="review-group">
                <span className="review-group__label">PLAN</span>
                <div className="review-cam-unlimited">
                  <div className="review-cam-unlimited__left">
                    <img src="/icons/icon-cam-unlimited.svg" alt="Cam Unlimited" className="review-cam-unlimited__icon" />
                    <span className="review-cam-unlimited__name">
                      Cam <span>Unlimited</span>
                    </span>
                  </div>
                  <div className="review-cam-unlimited__pricing">
                    <span className="review-cam-unlimited__compare">$12.99/mo</span>
                    <span className="review-cam-unlimited__price">$9.99/mo</span>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping */}
            <div className="review-shipping">
              <div className="review-shipping__left">
                <img src="/icons/icon-shipping.svg" alt="Fast Shipping" className="review-shipping__icon" />
                <span>Fast Shipping</span>
              </div>
              <div className="review-shipping__pricing">
                <span className="review-shipping__compare">$5.99</span>
                <span className="review-shipping__free">FREE</span>
              </div>
            </div>

          </div>

          {/* Right — summary */}
          <div className="review-panel__summary">

            {/* Guarantee text — visible only at Frame 1736 breakpoint */}
            <div className="review-guarantee__text">
              <p className="review-guarantee__heading">30-day hassle-free returns</p>
              <p className="review-guarantee__body">
                If you're not totally in love with the product, we will refund you 100%.
              </p>
            </div>

            {/* Badge + total on same row */}
            <div className="review-guarantee-total-row">
              <img
                src="/images/satisfaction-badge.png"
                alt="100% satisfaction guarantee"
                className="review-guarantee__badge"
              />
              <div className="review-total">
                <div className="review-total__row">
                  <span className="review-total__financing-pill">
                    as low as $19.19/mo
                  </span>
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
                {/* {savings > 0 && (
                  <p className="review-total__savings">
                    Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
                  </p>
                )} */}
              </div>
            </div>

            <div>
               {savings > 0 && (
                  <p className="review-total__savings">
                    Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
                  </p>
                )}
            </div>

            {/* Checkout */}
            <button className="review-checkout" onClick={() => alert('Order placed!')}>
              Checkout
            </button>

            {/* Save */}
            <button className="review-save" onClick={saveSystem}>
              Save my system for later
            </button>
            

          </div>
        </div>
      )}
    </div>
  );
}