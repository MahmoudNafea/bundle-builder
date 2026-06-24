import { ProductCard } from "./components/builder/ProductCard";
import { BundleProvider } from "./context/BundleContext";
import productsData from './data/products.json';

function App() {
    const firstProduct = productsData.steps[0].products[0];

  return (
    //   <BundleProvider>
    //   <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
    //     <h1>Bundle Builder</h1>
    //     <p>App is working </p>
    //   </div>
    // </BundleProvider>
      <BundleProvider>
      <div style={{ padding: '2rem', maxWidth: '400px' }}>
        <ProductCard product={firstProduct} />
      </div>
    </BundleProvider>
  );
}

export default App;
