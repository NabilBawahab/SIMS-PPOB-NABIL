import { CreditCard } from "lucide-react";
import { ProfileBalanceCard } from "../_components/profile-balance-card";
import { useState } from "react";
import { useGetBalanceQuery, useTopUpMutation } from "../store/backend-api";
import { useNavigate } from "react-router-dom";

const presets = [10000, 20000, 50000, 100000, 250000, 500000];

export default function DashboardTopUp() {
  const [amount, setAmount] = useState<number>(0);
  const navigate = useNavigate();
  const { refetch } = useGetBalanceQuery(undefined);
  const [topUp] = useTopUpMutation();

  const handleAmountChange = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    try {
      const confirmed = confirm(
        `Apakah kamu yakin ingin Top Up sebesar Rp${amount.toLocaleString(
          "id-ID",
        )}`,
      );

      if (!confirmed) {
        alert("Top Up tidak berhasil");
        return;
      }

      await topUp({
        top_up_amount: amount,
      }).unwrap();

      await refetch();
      alert(`Berhasil Top Up senilai Rp${amount.toLocaleString("id-ID")}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Top Up tidak berhasil", error);
      alert("Top Up gagal, mohon dicoba kembali");
    }
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
        <div className="flex flex-col gap-10 md:flex-row md:gap-0">
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
              <button
                onClick={handleSubmit}
                className="flex justify-center bg-[#f13b2f] text-white w-full py-2 rounded-sm hover:cursor-pointer"
              >
                Top Up
              </button>
            </div>
          </section>
          <section className="grid grid-cols-3 gap-2">
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => handleAmountChange(preset)}
                className="border rounded px-4 py-2 hover:bg-[#f13b2f] hover:text-white hover:cursor-pointer transition-colors duration-200"
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
