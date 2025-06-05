import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register-page";
import LoginPage from "./pages/login-page";
import DashboardPage from "./pages/dashboard-page";
import DashboardLayout from "./pages/dashboard-layout";
import Home from "./pages";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setToken } from "./store/auth-slice";
import DashboardProfile from "./pages/dashboard-profile";

export default function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     dispatch(setToken(token));
  //   }
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* </Route> */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard/profile" element={<DashboardProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
