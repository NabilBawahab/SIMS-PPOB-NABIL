import { Minus, Plus } from "lucide-react";
import { ProfileBalanceCard } from "../_components/profile-balance-card";
import { useGetTransactionHistoryQuery } from "../store/backend-api";
import { useEffect } from "react";

export default function DashboardTransaction() {
  const {
    data: transactions,
    error,
    isLoading,
    refetch,
  } = useGetTransactionHistoryQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occured</div>;
  }

  useEffect(() => {
    refetch();
  }, []);

  return (
    <ProfileBalanceCard>
      <div className="max-w-full">
        <p className="px-10 font-medium text-gray-900 mb-10 text-lg">
          Semua Transaksi
        </p>
        <section className="px-10 space-y-7">
          {transactions?.data.records.map((record, index) => {
            const dateTime = new Date(record.created_on);

            const date = dateTime.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            const time = dateTime.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            return (
              <div className="flex justify-between border border-gray-200 rounded-md max-w-full px-4 py-3">
                <div>
                  {record.transaction_type === "TOPUP" ? (
                    <div className="flex gap-2 items-center text-green-500 font-bold text-xl">
                      <Plus size={16} />
                      <p>Rp{record.total_amount.toLocaleString("id-ID")}</p>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center text-red-500 font-bold text-xl">
                      <Minus size={16} />
                      <p>Rp{record.total_amount.toLocaleString("id-ID")}</p>
                    </div>
                  )}
                  <p className="text-gray-300 text-sm mt-2">
                    {date} {time}
                  </p>
                </div>
                <p className="mr-2 mt-1">{record.description}</p>
              </div>
            );
          })}
        </section>
      </div>
    </ProfileBalanceCard>
  );
}
