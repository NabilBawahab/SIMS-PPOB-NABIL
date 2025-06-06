import { Link, useNavigate } from "react-router-dom";
import ilustrasilogin from "/ilustrasilogin.png";
import { AtSign, LockKeyhole, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useRegisterMutation } from "../store/backend-api";

type Input = {
  placeholder: string;
  icon: React.ReactNode;
  type: string;
};

const inputs: Input[] = [
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

export default function RegisterPage() {
  //forms => [0] email, [1] nama depan, [2] nama belakang, [3] password, [4] konfirmasi password
  const [forms, setForms] = useState<string[]>(Array(inputs.length).fill(""));
  const [errors, setErrors] = useState<string[]>(Array(inputs.length).fill(""));
  const [register] = useRegisterMutation();

  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const isInitialized = useSelector(
    (state: RootState) => state.auth.isInitialized,
  );

  useEffect(() => {
    if (isAuthenticated && isInitialized) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isInitialized, navigate]);

  const handleChange = (index: number, value: string) => {
    const updated = [...forms];
    updated[index] = value;
    setForms(updated);

    const resetErrors = [...errors];
    resetErrors[index] = "";
    setErrors(resetErrors);
  };

  const handleSubmit = async () => {
    const checkError = [...errors];
    let notComplete = false;

    forms.forEach((isInputFill, index) => {
      if (!isInputFill.trim()) {
        checkError[index] = "field ini wajib diisi";
        notComplete = true;
      }
    });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(forms[0])) {
      checkError[0] = "format email tidak valid";
      notComplete = true;
    }

    if (forms[3].length && forms[4].length < 8) {
      checkError[3] = "Password harus lebih dari 8 karakter";
      notComplete = true;
    }

    if (forms[3] !== forms[4]) {
      checkError[4] = "konfirmasi password tidak cocok";
      notComplete = true;
    } else {
      checkError[4] = "";
    }

    setErrors(checkError);

    if (notComplete) return;

    // send data to backend
    try {
      const data = await register({
        email: forms[0],
        first_name: forms[1],
        last_name: forms[2],
        password: forms[3],
      }).unwrap();
      alert(data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error registrasi user", error);
      alert("Error registrasi user, silahkan mencoba kembali di lain waktu");
    }
  };

  return (
    <main className="flex flex-col-reverse justify-between md:flex-row gap-10 md:gap-0 md:mb-0 mb-10">
      <section className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="flex items-center gap-2 justify-center mb-2">
          <img src="/logo.png" />
          <h3 className="font-bold text-xl">SIMS PPOB NABIL</h3>
        </div>
        <h1 className="font-bold text-center text-xl">
          Lengkapi data untuk
          <br /> membuat akun
        </h1>
        <div className="space-y-6 md:w-md">
          {inputs.map((input, index) => (
            <div>
              <div
                className={`${
                  errors[index] && "border-red-500"
                } flex items-center border border-gray-300 rounded-sm px-2 py-2 space-x-2 focus-within:border-orange-600`}
              >
                <span
                  className={`${forms[index] ? "text-black" : "text-gray-400"}`}
                >
                  {input.icon}
                </span>
                <input
                  placeholder={input.placeholder}
                  className="focus:outline-none w-full"
                  type={input.type}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
              </div>
              {errors[index] ? (
                <p className="text-red-500 flex justify-end text-sm px-1">
                  {errors[index]}
                </p>
              ) : null}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="flex justify-center bg-orange-600 text-white w-full py-2 rounded-sm mt-12 hover:cursor-pointer"
          >
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
