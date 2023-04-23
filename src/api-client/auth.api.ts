import { LoginBody } from "@/model";
import axiosClient from "./axios-client";

export const authApi = {
  login(body: LoginBody) {
    return axiosClient.post("/login", body);
  },
  getProfile() {
    return axiosClient.get("/profile");
  },
  logout() {
    return axiosClient.post("/logout");
  },
};
