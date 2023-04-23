import { authApi } from "@/api-client";
import * as React from "react";

export default function LoginPage() {
  async function handleLogin() {
    try {
      await authApi.login({
        username: "test1",
        password: "123123",
      });
    } catch (error) {
      console.log("failed to login", error);
    }
  }
  async function handleGetProfile() {
    try {
      await authApi.getProfile();
    } catch (error) {
      console.log("failed to get profile", error);
    }
  }
  async function handleLogout() {
    try {
      await authApi.logout();
    } catch (error) {
      console.log("failed to logout", error);
    }
  }
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetProfile}>Get Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
