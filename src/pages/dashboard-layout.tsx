import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <header className="border border-gray-100">
        <div className="flex justify-between items-center h-16 px-8 text-gray-800">
          <p>SIMS PPOB</p>
          <div className="flex gap-2 items-center">
            <Link to="/">Top up</Link>
            <Link to="/">Transactions</Link>
            <Link to="/">Account</Link>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
