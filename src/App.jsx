// App root
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { LeadDetail } from "./pages/LeadDetail.jsx";
import { Login } from "./pages/Login.jsx";

export const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leads/:id" element={<LeadDetail />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
