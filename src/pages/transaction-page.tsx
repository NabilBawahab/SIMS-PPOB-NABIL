import { useNavigate, useParams } from "react-router-dom";
import { ProfileBalanceCard } from "../_components/profile-balance-card";
import { CreditCard } from "lucide-react";
import {
  useGetServicesQuery,
  useTransactionMutation,
} from "../store/backend-api";

const amount = 40000;

export function TransactionPage() {
  const { serviceCode } = useParams<{ serviceCode: string }>();
  const {
    data: services,
    error,
    isLoading,
    refetch,
  } = useGetServicesQuery(undefined);
  const [transaction] = useTransactionMutation();
  const navigate = useNavigate();

  const service = services?.data.find(
    (item) => item.service_code === serviceCode,
  );

  if (!service) return <div>Service tidak ditemukan</div>;

  const handleSubmit = async () => {
    try {
      const confirmed = confirm(
        `Pembayaran ${service.service_name} sebesar Rp${amount}, apakah anda yakin?`,
      );
      if (!confirmed) return;

      await transaction({ service_code: service.service_code }).unwrap();
      await refetch();
      alert("Pembayaran Berhasil!");
      navigate("/dashboard");
    } catch (error) {
      console.error(`Pembayaran ${service.service_name} gagal`, error);
      alert("Pembayaran gagal");
    }
  };
  return (
    <ProfileBalanceCard>
      <div className="max-w-full">
        <div className="px-10">
          <p className="font-medium text-gray-900">Pembayaran</p>
          <div className="flex gap-2 items-center mb-10">
            <img src={service.service_icon} className="size-9" />
            <p className="text-xl font-bold">{service.service_name}</p>
          </div>
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
              <button
                onClick={handleSubmit}
                className="flex justify-center bg-orange-600 text-white w-full py-2 rounded-sm hover:cursor-pointer"
              >
                Top Up
              </button>
            </div>
          </section>
        </div>
      </div>
    </ProfileBalanceCard>
  );
}
