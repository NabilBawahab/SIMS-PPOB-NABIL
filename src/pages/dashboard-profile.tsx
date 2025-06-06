import React from "react";
import { Avatar } from "../components/avatar";
import { AtSign, User } from "lucide-react";
import { useGetProfileQuery } from "../store/backend-api";

type Input = {
  title: string;
  icon: React.ReactNode;
  type: string;
  value: string | undefined;
  disabled: boolean;
};

export default function DashboardProfile() {
  // const [user, setUser] = useState<GetProfileResponse>();

  // const token = useAuth();

  // useEffect(() => {
  //   async function fetchUserProfile() {
  //     const data = await getProfile(token);
  //     setUser(data);
  //   }
  //   fetchUserProfile();
  // }, [token]);

  const { data: profile, error, isLoading } = useGetProfileQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

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
                value={input.value}
                disabled={input.disabled}
              />
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
