import { useEffect, useState, type ReactNode } from "react";
import { Avatar } from "../components/avatar";
import { getBalance, getProfile } from "../api/api-client";
import { Eye, EyeClosed } from "lucide-react";
import { useGetBalanceQuery, useGetProfileQuery } from "../store/backend-api";

type Props = {
  children?: ReactNode;
};

export const ProfileBalanceCard = ({ children }: Props) => {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const {
    data: profile,
    error: profileError,
    isLoading: isProfileLoading,
  } = useGetProfileQuery(undefined);
  const {
    data: balance,
    error: balanceError,
    isLoading: isBalanceLoading,
  } = useGetBalanceQuery(undefined);

  if (profileError) {
    return <div>Error Occured</div>;
  }

  if (balanceError) {
    return <div>Error Occured</div>;
  }

  if (isProfileLoading) {
    return <div>Loading...</div>;
  }

  if (isBalanceLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-11/12 mx-auto">
      <section className="flex justify-between px-10 py-8">
        <div className="flex-1 space-y-4">
          <div className="border border-gray-200 size-16 rounded-full overflow-hidden">
            <Avatar
              imageUrl={profile?.data.profile_image}
              userFullName={`${profile?.data.first_name} ${profile?.data.last_name}`}
            />
          </div>
          <div>
            <p className="text-slate-800">Selamat datang,</p>
            <p className="text-2xl font-bold">{`${profile?.data.first_name} ${profile?.data.last_name}`}</p>
          </div>
        </div>
        <div className="bg-[#f13b2f] bg-cover bg-center flex-1 rounded-xl px-6 py-4 text-white space-y-5">
          <p className="font-medium text-sm">Saldo anda</p>
          <p className="font-bold text-2xl">
            Rp{" "}
            {showBalance
              ? new Intl.NumberFormat("id-ID", {
                  minimumFractionDigits: 0,
                }).format(balance?.data.balance ?? 0)
              : "•••••••"}
          </p>
          <button
            className="flex gap-2 items-center justify-center font-thin text-xs hover:cursor-pointer"
            onClick={() => {
              setShowBalance(!showBalance);
            }}
          >
            Lihat Saldo{" "}
            <div>
              {showBalance ? <Eye size={16} /> : <EyeClosed size={16} />}
            </div>
          </button>
        </div>
      </section>
      {children}
    </main>
  );
};
