import { BrowserRouter } from "react-router-dom";

import AppContent from "./components/AppContent";
import ScrollToTop from "./components/Common/ScrollToTop";

import { CartProvider } from "./context/cartProvider";
import { AuthProvider } from "./context/authProvider";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <CartProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
