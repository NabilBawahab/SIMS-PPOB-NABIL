import { Link, Outlet, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function DashboardLayout() {
  // validasi
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const isInitialized = useSelector(
    (state: RootState) => state.auth.isInitialized,
  );

  useEffect(() => {
    if (!isAuthenticated && isInitialized) {
      navigate("/login");
    }
  }, [isAuthenticated, isInitialized, navigate]);

  return (
    <>
      <header className="border border-gray-200 px-20">
        <div className="flex justify-between items-center h-16 px-8 text-gray-800">
          <section className="flex items-center gap-2">
            <img src="/logo.png" width={25} />
            <Link to="/dashboard" className="font-sans font-medium">
              SIMS PPOB NABIL
            </Link>
          </section>
          <section className="flex gap-10 items-center font-medium">
            <Link to="/dashboard/topup">Top up</Link>
            <Link to="/dashboard/transaction">Transactions</Link>
            <Link to="/dashboard/profile">Account</Link>
          </section>
        </div>
      </header>
      <Outlet />
    </>
  );
}
