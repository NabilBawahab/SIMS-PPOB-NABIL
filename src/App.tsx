import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register-page";
import LoginPage from "./pages/login-page";
import DashboardPage from "./pages/dashboard-page";
import DashboardLayout from "./pages/dashboard-layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<MainLayout />}> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* </Route> */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
