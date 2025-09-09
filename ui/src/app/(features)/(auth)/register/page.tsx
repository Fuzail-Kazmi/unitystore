"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { useRegisterMutation } from "../_hooks";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  const { mutate: register, isPending } = useRegisterMutation();

  useEffect(() => setMounted(true), []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    register(
      { username, email, password },
      {
        onSuccess: () => {
          toast.success("Account created successfully!");
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.detail || "Registration failed");
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {mounted && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      )}

      <div className="w-full flex items-center justify-center relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden w-full max-w-4xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-8 lg:p-12 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="UnityStore"
                  className="h-10 w-10 md:h-12 md:w-12"
                />
                <div className="text-primary-foreground font-bold text-lg md:text-2xl">
                  UnityStore
                </div>
              </div>
              <h2 className="text-3xl font-bold mt-8">Create Account</h2>
              <p className="mt-4 text-blue-100">
                Join UnityStore and start shopping today.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 p-8 lg:p-12">
            <form onSubmit={handleRegister} className="space-y-6 max-w-md mx-auto">
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-gray-50/50"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-gray-50/50"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  autoComplete="current-password" 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border rounded-2xl bg-gray-50/50"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center"
              >
                {isPending ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 font-semibold">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
