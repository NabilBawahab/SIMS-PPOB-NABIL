import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <header className="border border-gray-200 px-20">
        <div className="flex justify-between items-center h-16 px-8 text-gray-800">
          <section className="flex items-center gap-2">
            <img src="/logo.png" width={25} />
            <p className="font-sans font-medium">SIMS PPOB</p>
          </section>
          <section className="flex gap-10 items-center font-medium">
            <Link to="/">Top up</Link>
            <Link to="/">Transactions</Link>
            <Link to="/">Account</Link>
          </section>
        </div>
      </header>
      <Outlet />
    </>
  );
}
