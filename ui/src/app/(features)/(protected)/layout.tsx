"use client";

import { useAuth } from "@/app/_hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "../_layout/header";
import { Footer } from "../_layout/footer";
import { HeadLink } from "../_layout/head-link";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <header>
        <Header />
        <HeadLink />
      </header>
      <main className="min-h-screen w-full bg-gray-50">{children}</main>
      <footer className="border-t border-gray-200 mt-8">
        <Footer />
      </footer>
    </div>
  );
}


 