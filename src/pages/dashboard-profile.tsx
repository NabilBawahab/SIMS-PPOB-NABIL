import React, { useEffect, useState } from "react";
import { Avatar } from "../components/avatar";
import { getProfile, type GetProfileResponse } from "../api/api-client";
import { AtSign, User } from "lucide-react";
import { useAuth } from "../utils/auth";

type Form = {
  title: string;
  icon: React.ReactNode;
  type: string;
};

export default function DashboardProfile() {
  const forms: Form[] = [
    {
      title: "Email",
      icon: <AtSign size={16} />,
      type: "email",
    },
    {
      title: "Nama Depan",
      icon: <User size={16} />,
      type: "text",
    },
    {
      title: "Nama Belakang",
      icon: <User size={16} />,
      type: "text",
    },
  ];

  const [user, setUser] = useState<GetProfileResponse>();

  const token = useAuth();

  useEffect(() => {
    async function fetchUserProfile() {
      const data = await getProfile(token);
      setUser(data);
    }
    fetchUserProfile();
  }, [token]);

  return (
    <main className="flex flex-col items-center py-16">
      <section className="flex flex-col items-center space-y-6">
        <div className="relative border border-gray-200 size-52 rounded-full overflow-hidden">
          <Avatar />
        </div>
        <p className="font-bold text-gray-800 text-3xl mb-10">{`${user?.data.first_name} ${user?.data.last_name}`}</p>
      </section>
      <section className="w-1/2 space-y-6">
        {forms.map((form, index) => (
          <div key={index}>
            <p className="mb-1">{form.title}</p>
            <div className="flex items-center w- border border-gray-300 rounded-sm px-2 py-2 space-x-2 focus-within:border-orange-600">
              <span className="text-black">{form.icon}</span>
              <input className="focus:outline-none w-full" type={form.type} />
            </div>
          </div>
        ))}
        <button className="flex justify-center bg-orange-600 text-white w-full py-2 rounded-sm mt-12 hover:cursor-pointer">
          Simpan
        </button>
      </section>
    </main>
  );
}
