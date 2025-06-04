import { useState } from "react";
import { FeaturesCard } from "../_components/features-card";
import { PromotionalCard } from "../_components/promotional-card";
import { Avatar } from "../components/avatar";

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState<boolean>(false);

  const balance: number = 2_000_000;

  return (
    <main className="max-w-11/12 mx-auto">
      <section className="flex justify-between px-10 py-8">
        <div className="flex-1 space-y-4">
          <div className="border size-16 rounded-full overflow-hidden">
            <Avatar />
          </div>
          <div>
            <p className="text-slate-800">Selamat datang,</p>
            <p className="text-2xl font-bold">Bambang</p>
          </div>
        </div>
        <div className="bg-[url('/backgroundsaldo.png')] bg-cover bg-center flex-1 rounded-xl px-6 py-4 text-white space-y-5">
          <p className="font-medium text-sm">Saldo anda</p>
          <p className="font-bold text-2xl">
            Rp{" "}
            {showBalance
              ? new Intl.NumberFormat("id-ID", {
                  minimumFractionDigits: 0,
                }).format(balance)
              : "•••••••"}
          </p>
          <button
            className="font-thin text-xs hover:cursor-pointer"
            onClick={() => {
              setShowBalance(!showBalance);
            }}
          >
            Lihat Saldo
          </button>
        </div>
      </section>
      <FeaturesCard />
      <PromotionalCard />
    </main>
  );
}
