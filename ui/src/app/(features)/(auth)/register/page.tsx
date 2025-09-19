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
          {/* <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-8 lg:p-12 text-white relative"> */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-black to-red-600 p-2 lg:p-8 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2">
                <Link href="/" className="flex-shrink-0">
                  <div className="h-20 md:h-30 flex items-center justify-center">
                    <img
                      src="/cover-logo2.png"
                      alt="Al Hameed Computers"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </Link>
              </div>
              <div className="hidden lg:block">
                <h2 className="text-3xl font-bold mt-8 text-center">Create Account</h2>
                <p className="mt-4 text-blue-100 text-center">
                  Join Al Hameed Computers and start shopping today.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-300 rounded-full flex-shrink-0"></div>
                    <span className="text-blue-100">Secure & Fast Checkout</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-300 rounded-full flex-shrink-0"></div>
                    <span className="text-blue-100">Premium Quality Products</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-300 rounded-full flex-shrink-0"></div>
                    <span className="text-blue-100">24/7 Customer Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 p-6 md:p-8 lg:p-12">
            <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto">
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-900 h-4 w-4 md:h-5 md:w-5" />
                <input
                  type="text"
                  value={username}
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 md:py-4 border border-gray-200 rounded-lg md:rounded-2xl  focus:ring-0 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm text-gray-900 placeholder-gray-500 text-sm md:text-base"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-900 h-4 w-4 md:h-5 md:w-5" />
                <input
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 md:py-4 border border-gray-200 rounded-lg md:rounded-2xl  focus:ring-0 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm text-gray-900 placeholder-gray-500 text-sm md:text-base"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3 text-gray-900 h-4 w-4 md:h-5 md:w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 md:py-4 border border-gray-200 rounded-lg md:rounded-2xl  focus:ring-0 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm text-gray-900 placeholder-gray-500 text-sm md:text-base"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 h-4 w-4 md:h-5 md:w-5"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isPending}
                // className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center"
                className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-2 md:py-4 rounded-lg md:rounded-2xl font-semibold hover:from-black hover:to-gray-900 transition-all duration-200 flex items-center justify-center cursor-pointer text-sm md:text-base space-x-2"
              >
                {isPending ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 text-sm md:text-base">
                Already have an account?{" "}
                <Link href="/login" className="text-gray-900 hover:text-blue-800 font-semibold transition-colors cursor-pointer">
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
