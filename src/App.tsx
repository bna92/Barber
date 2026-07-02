import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import { Toaster } from "sonner";

const Home = lazy(() => import("./pages/Home"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const AdminProductsPage = lazy(() => import("./pages/AdminProductsPage"));
const AdminHeroPage = lazy(() => import("./pages/AdminHeroPage"));
const AdminServicesPage = lazy(() => import("./pages/AdminServicesPage"));
const AdminGalleryPage = lazy(() => import("./pages/AdminGalleryPage"));
const AdminTikTokPage = lazy(() => import("./pages/AdminTikTokPage"));

const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(
  () => import("./pages/TermsAndConditionsPage"),
);

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

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin" />
      </div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/productos/:id" element={<ProductDetailPage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute>
                <AdminProductsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/hero"
            element={
              <ProtectedRoute>
                <AdminHeroPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/servicios"
            element={
              <ProtectedRoute>
                <AdminServicesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/galeria"
            element={
              <ProtectedRoute>
                <AdminGalleryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/tiktok"
            element={
              <ProtectedRoute>
                <AdminTikTokPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/aviso-de-privacidad"
            element={<PrivacyPolicyPage />}
          />

          <Route
            path="/terminos-y-condiciones"
            element={<TermsAndConditionsPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;