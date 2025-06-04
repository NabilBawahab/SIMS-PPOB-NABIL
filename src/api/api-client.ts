interface RegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export async function register({
  email,
  first_name,
  last_name,
  password,
}: RegisterPayload) {
  const res = await fetch(
    "https://take-home-test-api.nutech-integrasi.com/registration",
    {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        email,
        first_name,
        last_name,
        password,
      }),
    },
  );
  const data = await res.json();

  return data;
}

export async function login({ email, password }: LoginPayload) {
  const res = await fetch(
    "https://take-home-test-api.nutech-integrasi.com/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );
  const data = await res.json();

  return data;
}

export async function getBanners() {
  const res = await fetch(
    "https://take-home-test-api.nutech-integrasi.com/banner",
  );
  const data = await res.json();

  return data;
}
