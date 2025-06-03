import ilustrasilogin from "/ilustrasilogin.png";
import { AtSign, LockKeyhole, User } from "lucide-react";

export default function LoginPage() {
  const inputs = [
    {
      placeholder: "masukan email anda",
      icon: <AtSign size={16} />,
    },
    {
      placeholder: "nama depan",
      icon: <User size={16} />,
    },
    {
      placeholder: "nama belakang",
      icon: <User size={16} />,
    },
    {
      placeholder: "buat password",
      icon: <LockKeyhole size={16} />,
    },
    {
      placeholder: "konfirmasi password",
      icon: <LockKeyhole size={16} />,
    },
  ];

  return (
    <main className="flex justify-between">
      <section className="flex flex-1 flex-col items-center justify-center w-1/2">
        <div className="flex items-center gap-2 justify-center mb-2">
          <img src="/logo.png" />
          <h3 className="font-bold text-xl">SIMS PPOB</h3>
        </div>
        <h1 className="font-bold text-center text-xl">
          Lengkapi data untuk
          <br /> membuat akun
        </h1>
        <div className="space-y-4 w-md mt-10">
          {inputs.map((input) => (
            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-2 space-x-2">
              <span className="text-gray-400">{input.icon}</span>
              <input
                placeholder={input.placeholder}
                className="focus:outline-none w-full"
              />
            </div>
          ))}
          <button className="flex justify-center bg-orange-600 text-white w-full py-2 rounded-sm">
            Registrasi
          </button>
        </div>
      </section>
      <section className="h-screen flex-1">
        <img src={ilustrasilogin} className="h-full w-full object-cover" />
      </section>
    </main>
  );
}
