import { BundleProvider } from "./context/BundleContext";

function App() {
  return (
      <BundleProvider>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Bundle Builder</h1>
        <p>App is working </p>
      </div>
    </BundleProvider>
  );
}

export default App;
