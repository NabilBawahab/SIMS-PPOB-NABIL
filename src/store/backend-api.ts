import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getProfile } from "../api/api-client";
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

export type LoginRequest = { email: string; password: string };

export type UpdateProfileRequest = { first_name: string; last_name: string };
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
  }),
});

export const {
  useGetServicesQuery,
  useGetBannersQuery,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = backendApi;
