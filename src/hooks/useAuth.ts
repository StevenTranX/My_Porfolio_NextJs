import { authApi } from "@/api-client";
import axios from "axios";
import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";

export function useAuth(options?: Partial<PublicConfiguration>) {
  // profile

  const {
    data: profile,
    error,
    mutate,
  } = useSWR("/profile", null, {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options,
  });

  const firstLoading = profile === undefined && error === undefined;

  async function login() {
    await authApi.login({
      username: "steven",
      password: "steven",
    });

    await mutate();
  }

  async function logout() {
    await authApi.logout();

    mutate({}, false);
  }
  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
  };
}
