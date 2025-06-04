import { Link } from "react-router-dom";
import ilustrasilogin from "/ilustrasilogin.png";
import { AtSign, LockKeyhole, User } from "lucide-react";
import { useState } from "react";

export function LoginRegisterComp() {
  const [isInputFill, setIsInputFill] = useState<string[]>([]);

  const inputs = [
    {
      placeholder: "masukan email anda",
      icon: <AtSign size={16} />,
      type: "email",
    },
    {
      placeholder: "nama depan",
      icon: <User size={16} />,
      type: "text",
    },
    {
      placeholder: "nama belakang",
      icon: <User size={16} />,
      type: "text",
    },
    {
      placeholder: "buat password",
      icon: <LockKeyhole size={16} />,
      type: "password",
    },
    {
      placeholder: "konfirmasi password",
      icon: <LockKeyhole size={16} />,
      type: "password",
    },
  ];

  return (
    <main className="flex justify-between">
      <section className="flex flex-1 flex-col items-center justify-center w-1/2 gap-8">
        <div className="flex items-center gap-2 justify-center mb-2">
          <img src="/logo.png" />
          <h3 className="font-bold text-xl">SIMS PPOB</h3>
        </div>
        <h1 className="font-bold text-center text-xl">
          Lengkapi data untuk
          <br /> membuat akun
        </h1>
        <div className="space-y-6 w-md">
          {inputs.map((input, index) => (
            <div className="flex items-center border border-gray-300 rounded-sm px-2 py-2 space-x-2 focus-within:border-orange-600">
              <span
                className={`${
                  isInputFill[index] ? "text-black" : "text-gray-400"
                }`}
              >
                {input.icon}
              </span>
              <input
                placeholder={input.placeholder}
                className="focus:outline-none w-full"
                type={input.type}
                onChange={(e) => {
                  const updated = [...isInputFill];
                  updated[index] = e.target.value;
                  setIsInputFill(updated);
                }}
              />
            </div>
          ))}
          <button className="flex justify-center bg-orange-600 text-white w-full py-2 rounded-sm mt-12">
            Registrasi
          </button>
          <p className="w-fit mx-auto">
            Sudah punya akun? login{" "}
            <Link to="/login" className="text-orange-600">
              disini
            </Link>
          </p>
        </div>
      </section>
      <section className="h-screen flex-1">
        <img src={ilustrasilogin} className="h-full w-full object-cover" />
      </section>
    </main>
  );
}
