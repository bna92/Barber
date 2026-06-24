import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminProductsPage from "./pages/AdminProductsPage";  

import { Toaster } from "sonner";

function RedirectOnNewSession() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionStarted = sessionStorage.getItem("sessionStarted");

    if (!sessionStarted) {
      sessionStorage.setItem("sessionStarted", "true");

      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return null;
}


function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        richColors
        closeButton
        duration={2500}
        expand={true}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/productos/:id" element={<ProductDetailPage />} />
        <Route path="/admin/productos" element={<AdminProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;