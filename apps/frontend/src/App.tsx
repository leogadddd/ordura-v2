import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./routes/Login";
import DashboardPage from "./routes/Dashboard";
import POSPage from "./routes/POS";
import ProductsPage from "./routes/products";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
      <Route
        path="/pos"
        element={
          <AppLayout>
            <POSPage />
          </AppLayout>
        }
      />
      <Route
        path="/products"
        element={
          <AppLayout>
            <ProductsPage />
          </AppLayout>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
