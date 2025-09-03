"use client";

import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser, refreshAccessTokenFn } from "../_api"; // api/index.ts se
import { useRouter } from "next/navigation";

// ---------------- LOGIN ----------------
export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["login-user"],

    onSuccess: (data) => {
      // tokens save in localStorage
      localStorage.setItem("tokens", JSON.stringify(data));

      // redirect after login
      router.push("/");
    },
    onError: (error: any) => {
      console.error("❌ Login failed:", error.response?.data || error.message);
    },
  });
};

// ---------------- REGISTER ----------------
export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    mutationKey: ["register-user"],

    onSuccess: (data) => {
      console.log("✅ Registered successfully", data);
      // Redirect to login or auto-login
      router.push("/login");
    },
    onError: (error: any) => {
      console.error("❌ Register failed:", error.response?.data || error.message);
    },
  });
};

// ---------------- LOGOUT ----------------
export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("tokens");
    router.push("/login");
  };

  return { logout };
};

// ---------------- REFRESH TOKEN ----------------
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshAccessTokenFn,
    mutationKey: ["refresh-token"],
  });
};
