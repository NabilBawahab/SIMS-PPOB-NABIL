import { useEffect, useState, type ReactNode } from "react";
import { Avatar } from "../components/avatar";
import { getBalance, getProfile } from "../api/api-client";

type Props = {
  children?: ReactNode;
};

type User = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
};

export const ProfileBalanceCard = ({ children }: Props) => {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number>();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUserData() {
      const [dataUser, dataBalance] = await Promise.all([
        getProfile(token),
        getBalance(token),
      ]);
      setUser(dataUser.data || null);
      setBalance(dataBalance.data || 0);
    }
    fetchUserData();
  }, []);

  return (
    <main className="max-w-11/12 mx-auto">
      <section className="flex justify-between px-10 py-8">
        <div className="flex-1 space-y-4">
          <div className="border border-gray-200 size-16 rounded-full overflow-hidden">
            <Avatar
              imageUrl={user?.profile_image}
              userFullName={`${user?.first_name} ${user?.last_name}`}
            />
          </div>
          <div>
            <p className="text-slate-800">Selamat datang,</p>
            <p className="text-2xl font-bold">{`${user?.first_name} ${user?.last_name}`}</p>
          </div>
        </div>
        <div className="bg-[url('/backgroundsaldo.png')] bg-cover bg-center flex-1 rounded-xl px-6 py-4 text-white space-y-5">
          <p className="font-medium text-sm">Saldo anda</p>
          <p className="font-bold text-2xl">
            Rp{" "}
            {showBalance
              ? new Intl.NumberFormat("id-ID", {
                  minimumFractionDigits: 0,
                }).format(balance ?? 0)
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
      {children}
    </main>
  );
};
