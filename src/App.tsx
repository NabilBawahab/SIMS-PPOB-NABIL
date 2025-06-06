import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register-page";
import LoginPage from "./pages/login-page";
import DashboardPage from "./pages/dashboard-page";
import DashboardLayout from "./pages/dashboard-layout";
import Home from "./pages";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth, setToken } from "./store/auth-slice";
import DashboardProfile from "./pages/dashboard-profile";
import DashboardTopUp from "./pages/dashboard-topup";

export default function App() {
  const dispatch = useDispatch();
  // jalankan state initializeAuth
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* </Route> */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/dashboard/profile" element={<DashboardProfile />} />
        <Route path="/dashboard/topup" element={<DashboardTopUp />} />
      </Route>
    </Routes>
  );
}
