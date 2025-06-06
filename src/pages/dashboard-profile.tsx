import React, { useState } from "react";
import { Avatar } from "../components/avatar";
import { AtSign, User } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../store/backend-api";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth-slice";
import { useNavigate } from "react-router-dom";

type Input = {
  title: string;
  icon: React.ReactNode;
  type: string;
  value: string | undefined;
  disabled: boolean;
};

export default function DashboardProfile() {
  const [form, setForm] = useState<string[]>([]);
  const {
    data: profile,
    error,
    isLoading,
    refetch,
  } = useGetProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  const handleChange = (index: number, value: string) => {
    const newForm = [...form];
    newForm[index] = value;
    setForm(newForm);
  };

  const handleSubmit = async () => {
    try {
      await updateProfile({
        first_name: form[1].trim(),
        last_name: form[2].trim(),
      }).unwrap();
      alert("berhasil update profil");
      refetch();
    } catch (error) {
      console.error("gagal update profile", error);
      alert("Terjadi kesalahan saat update profil");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const inputs: Input[] = [
    {
      title: "Email",
      icon: <AtSign size={16} />,
      type: "email",
      value: profile?.data.email,
      disabled: true,
    },
    {
      title: "Nama Depan",
      icon: <User size={16} />,
      type: "text",
      value: profile?.data.first_name,
      disabled: false,
    },
    {
      title: "Nama Belakang",
      icon: <User size={16} />,
      type: "text",
      value: profile?.data.last_name,
      disabled: false,
    },
  ];

  return (
    <main className="flex flex-col items-center py-16">
      <section className="flex flex-col items-center space-y-6">
        <div className="relative border border-gray-200 size-52 rounded-full overflow-hidden">
          <Avatar
            userFullName={`${profile?.data.first_name} ${profile?.data.last_name}`}
          />
        </div>
        <p className="font-bold text-gray-800 text-3xl mb-10">{`${profile?.data.first_name} ${profile?.data.last_name}`}</p>
      </section>
      <section className="w-1/2 space-y-6">
        {inputs.map((input, index) => (
          <div key={index}>
            <p className="mb-1">{input.title}</p>
            <div className="flex items-center w- border border-gray-300 rounded-sm px-2 py-2 space-x-2 focus-within:border-orange-600">
              <span className="text-black">{input.icon}</span>
              <input
                className="focus:outline-none w-full"
                type={input.type}
                defaultValue={input.value}
                disabled={input.disabled}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="flex justify-center bg-[#f13b2f] text-white w-full py-2 rounded-sm mt-12 hover:cursor-pointer"
        >
          Simpan
        </button>
        <button
          onClick={handleLogout}
          className="flex justify-center border border-[#f13b2f] text-[#f13b2f] w-full py-2 rounded-sm mt-4 hover:cursor-pointer"
        >
          Logout
        </button>
      </section>
    </main>
  );
}
