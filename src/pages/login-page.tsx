import { Link, useNavigate } from "react-router-dom";
import ilustrasilogin from "/ilustrasilogin.png";
import { AtSign, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../store/auth-slice";
import { useLoginMutation } from "../store/backend-api";

type Input = {
  placeholder: string;
  icon: React.ReactNode;
  type: string;
};

export default function LoginPage() {
  const inputs: Input[] = [
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
  //forms => [0] email, [1] password
  const [forms, setForms] = useState<string[]>(Array(inputs.length).fill(""));
  const [errors, setErrors] = useState<string[]>(Array(inputs.length).fill(""));

  const [
    login,
    {
      /*{ data, error, isLoading, isSuccess }*/
    },
  ] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(forms[0])) {
      checkError[0] = "format email tidak valid";
      notComplete = true;
    }

    if (forms[1].length < 8) {
      checkError[1] = "Password harus lebih dari 8 karakter";
      notComplete = true;
    }

    forms.forEach((isInputFills, index) => {
      if (!isInputFills.trim()) {
        checkError[index] = "field ini wajib diisi";
        notComplete = true;
      }
    });

    setErrors(checkError);

    if (notComplete) return;

    // console.log("Berhasil login", forms);

    try {
      // const data = await login({
      //   email: forms[0].trim(),
      //   password: forms[1],
      // });
      // alert(data.message);
      const result = await login({
        email: forms[0].trim(),
        password: forms[1],
      }).unwrap();

      const token = result.data.token;
      dispatch(setToken(token));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error login user", error);
      alert("login gagal, silahkan dicoba kembali di lain waktu");
    }
  };

  return (
    <main className="flex justify-between">
      <section className="flex flex-1 flex-col items-center justify-center w-1/2 gap-8">
        <div className="flex items-center gap-2 justify-center mb-2">
          <img src="/logo.png" />
          <h3 className="font-bold text-xl">SIMS PPOB NABIL</h3>
        </div>
        <h1 className="font-bold text-center text-xl">
          Masuk atau buat akun
          <br /> untuk memulai
        </h1>
        <div className="space-y-6 w-md">
          {inputs.map((input, index) => (
            <div key={index}>
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
                  onChange={(e) => {
                    handleChange(index, e.target.value);
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
