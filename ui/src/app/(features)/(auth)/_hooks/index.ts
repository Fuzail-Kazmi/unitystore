"use client";

import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser, refreshAccessTokenFn } from "../_api"; 
import { useRouter } from "next/navigation";

// ---------------- LOGIN ----------------
export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["login-user"],

    onSuccess: (data) => {
      localStorage.setItem("tokens", JSON.stringify(data));
      console.log(data)
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
