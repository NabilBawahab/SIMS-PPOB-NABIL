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

export type GetProfileResponse = {
  status: number;
  message: string;
  data: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  };
};

export async function getProfile(token: string | null) {
  const res = await fetch(
    "https://take-home-test-api.nutech-integrasi.com/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data: GetProfileResponse = await res.json();

  return data;
}

export async function getBalance(token: string | null) {
  const res = await fetch(
    "https://take-home-test-api.nutech-integrasi.com/balance",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function getServices(token: string | null) {
  const res = await fetch(
    "https://take-home-test-api.nutech-integrasi.com/services",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();

  return data;
}
