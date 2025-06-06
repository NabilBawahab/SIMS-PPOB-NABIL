import { CreditCard } from "lucide-react";
import { ProfileBalanceCard } from "../_components/profile-balance-card";
import { useState } from "react";

const presets = [10000, 20000, 50000, 100000, 250000, 500000];

export default function DashboardTopUp() {
  const [amount, setAmount] = useState<number>(10000);

  const handleSubmit = (value: number) => {
    setAmount(value);
  };
  //   const stringlocale = amount.toLocaleString("id-ID");
  //   console.log({ stringlocale });

  return (
    <ProfileBalanceCard>
      <div className="max-w-11/12">
        <div className="px-10">
          <p className="font-medium text-gray-900">Silahkan masukan</p>
          <p className="text-2xl font-bold mb-16">Nominal Top Up</p>
        </div>
        <div className="flex">
          <section className="px-10 flex-1">
            <div>
              <div className="flex items-center border rounded-sm px-3 py-2 mb-4 w-full gap-2">
                <CreditCard size={16} />
                <input
                  value={amount.toLocaleString("id-ID")}
                  className="outline-none"
                />
              </div>
            </div>
            <div>
              <button className="flex justify-center bg-orange-600 text-white w-full py-2 rounded-sm hover:cursor-pointer">
                Top Up
              </button>
            </div>
          </section>
          <section className="grid grid-cols-3 gap-2">
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => handleSubmit(preset)}
                className="border rounded px-4 py-2 hover:bg-orange-600 hover:text-white"
              >
                Rp{preset.toLocaleString("id-ID")}
              </button>
            ))}
          </section>
        </div>
      </div>
    </ProfileBalanceCard>
  );
}
