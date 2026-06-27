import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AdminDashboardPage from "./pages/AdminDashboardPage";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminHeroPage from "./pages/AdminHeroPage";
import AdminServicesPage from "./pages/AdminServicesPage";
import AdminGalleryPage from "./pages/AdminGalleryPage";
import AdminTikTokPage from "./pages/AdminTikTokPage";

import { Toaster } from "sonner";



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
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/productos/:id" element={<ProductDetailPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/productos" element={<ProtectedRoute> <AdminProductsPage /> </ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute> <AdminDashboardPage /> </ProtectedRoute>} />
        <Route path="/admin/hero" element={ <ProtectedRoute> <AdminHeroPage /> </ProtectedRoute> } />
        <Route path="/admin/servicios" element={ <ProtectedRoute> <AdminServicesPage /> </ProtectedRoute> } />
        <Route path="/admin/galeria" element={ <ProtectedRoute> <AdminGalleryPage /> </ProtectedRoute> } />
        <Route path="/admin/tiktok" element={ <ProtectedRoute> <AdminTikTokPage /> </ProtectedRoute> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;