import { Link } from "react-router-dom";
import ilustrasilogin from "/ilustrasilogin.png";
import { AtSign, LockKeyhole } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [isInputFill, setIsInputFill] = useState<string[]>([]);

  const inputs = [
    {
      placeholder: "masukan email anda",
      icon: <AtSign size={16} />,
      type: "email",
    },
    {
      placeholder: "masukan password anda",
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
          Masuk atau buat akun
          <br /> untuk memulai
        </h1>
        <div className="space-y-6 w-md">
          {inputs.map((input, index) => (
            <div className="flex items-center border border-gray-300 rounded-sm px-2 py-2 space-x-2">
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
          <button className="flex justify-center bg-orange-600 text-white w-full py-2 rounded-sm mt-12 hover:cursor-pointer">
            Masuk
          </button>
          <p className="w-fit mx-auto">
            Belum punya akun? registrasi{" "}
            <Link to="/register" className="text-orange-600">
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
