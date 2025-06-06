import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "./store";

export type ServicesResponse = {
  status: number;
  message: string;
  data: Array<{
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
  }>;
};

export type BannersResponse = {
  status: number;
  message: string;
  data: Array<{
    banner_name: string;
    banner_image: string;
    description: string;
  }>;
};

export type RegisterResponse = {
  status: number;
  message: string;
  data: any;
};

export type LoginResponse = {
  status: number;
  message: string;
  data: {
    token: string;
  };
};

export type ProfileResponse = {
  status: number;
  message: string;
  data: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  };
};

export type UpdateProfileResponse = {
  status: number;
  message: string;
  data: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  };
};

export type TopUpResponse = {
  status: number;
  message: string;
  data: {
    balance: number;
  };
};

export type BalanceResponse = {
  status: number;
  message: string;
  data: {
    balance: number;
  };
};

export type TransactionResponse = {
  status: number;
  message: string;
  data: {
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: string;
    total_amount: number;
    created_on: string;
  };
};

export type TransactionHistoryResponse = {
  status: number;
  message: string;
  data: {
    offset: number;
    limit: number;
    records: Array<{
      invoice_number: string;
      transaction_type: string;
      description: string;
      total_amount: number;
      created_on: string;
    }>;
  };
};

export type RegisterRequest = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type LoginRequest = { email: string; password: string };

export type UpdateProfileRequest = { first_name: string; last_name: string };

export type TopUpRequest = {
  top_up_amount: number;
};

export type TransactionRequest = { service_code: string };

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://take-home-test-api.nutech-integrasi.com",
    prepareHeaders: (
      headers,
      {
        /*{ getState }*/
      },
    ) => {
      // const token = (getState() as RootState).auth.token;
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    getServices: build.query<ServicesResponse, undefined>({
      query: () => "/services",
    }),
    getBanners: build.query<BannersResponse, undefined>({
      query: () => "/banner",
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: ({ email, first_name, last_name, password }) => ({
        url: "/registration",
        method: "POST",
        body: { email, first_name, last_name, password },
      }),
    }),
    getProfile: build.query<ProfileResponse, undefined>({
      query: () => "/profile",
    }),
    updateProfile: build.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: ({ first_name, last_name }) => ({
        url: "/profile/update",
        method: "PUT",
        body: { first_name, last_name },
      }),
    }),
    getBalance: build.query<BalanceResponse, undefined>({
      query: () => "/balance",
    }),
    topUp: build.mutation<TopUpResponse, TopUpRequest>({
      query: ({ top_up_amount }) => ({
        url: "/topup",
        method: "POST",
        body: { top_up_amount },
      }),
    }),
    transaction: build.mutation<TransactionResponse, TransactionRequest>({
      query: ({ service_code }) => ({
        url: "/transaction",
        method: "POST",
        body: { service_code },
      }),
    }),
    getTransactionHistory: build.query<TransactionHistoryResponse, undefined>({
      query: () => "/transaction/history",
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetBannersQuery,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetBalanceQuery,
  useTopUpMutation,
  useTransactionMutation,
  useGetTransactionHistoryQuery,
  useRegisterMutation,
} = backendApi;
