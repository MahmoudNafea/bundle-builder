import { AccordionStep } from "./components/builder/AccordionStep";
import { ProductCard } from "./components/builder/ProductCard";
import { BundleProvider } from "./context/BundleContext";
import productsData from './data/products.json';
import { Step } from "./types";

function App() {
    const firstProduct = productsData.steps[0].products[0];
    const steps = productsData.steps as Step[];


  return (
    //   <BundleProvider>
    //   <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
    //     <h1>Bundle Builder</h1>
    //     <p>App is working </p>
    //   </div>
    // </BundleProvider>
    //   <BundleProvider>
    //   <div style={{ padding: '2rem', maxWidth: '400px' }}>
    //     <ProductCard product={firstProduct} />
    //   </div>
    // </BundleProvider>
        <BundleProvider>
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {steps.map((step, index) => (
          <AccordionStep key={step.id} step={step} stepIndex={index} />
        ))}
      </div>
    </BundleProvider>
  );
}

export default App;
