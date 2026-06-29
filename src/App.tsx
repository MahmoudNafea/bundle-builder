import { BuilderPanel } from "./components/builder/BuilderPanel";
import { ReviewPanel } from "./components/review/ReviewPanel";
import { BundleProvider } from "./context/BundleContext";
import productsData from "./data/products.json";
import { Step } from "./types";
import "./App.css";

function App() {
  const steps = productsData.steps as Step[];

  return (
    <BundleProvider>
      <div className="app-layout">
        <BuilderPanel steps={steps} />
        <ReviewPanel steps={steps} />
      </div>
    </BundleProvider>
  );
}

export default App;
