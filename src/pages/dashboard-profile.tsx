import React, { useEffect, useState } from "react";
import { Avatar } from "../components/avatar";
import { AtSign, Pencil, User } from "lucide-react";
import {
  backendApi,
  useGetProfileQuery,
  useUpdateProfileImageMutation,
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
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initialForm = [
      profile?.data.email ?? "",
      profile?.data.first_name ?? "",
      profile?.data.last_name ?? "",
    ];
    setForm(initialForm);
  }, [profile]);

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
    dispatch(backendApi.util.resetApiState());
    navigate("/login");
  };

  const handleFileUpload = async (file: File | undefined) => {
    if (!file) return;

    // multipart file
    const formData = new FormData();
    formData.append("file", file);

    try {
      await updateProfileImage(formData).unwrap();
      refetch();
      alert("berhasil upload file");
    } catch (error) {
      console.error("error uploading image", error);
      alert("Gagal mengupload file");
    }
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
        <div className="relative">
          <div className="bottom-0 right-0 border border-gray-200 size-52 rounded-full overflow-hidden">
            <Avatar
              userFullName={`${profile?.data.first_name} ${profile?.data.last_name}`}
              imageUrl={profile?.data.profile_image}
            />
          </div>
          <div className="absolute bottom-0 right-7 bg-white p-1 rounded-full shadow">
            <label>
              <Pencil size={20} />
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="absolute inset-0 w-full h-full opacity-0"
                onChange={(e) => {
                  handleFileUpload(e.target.files?.[0]);
                }}
              />
            </label>
          </div>
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
