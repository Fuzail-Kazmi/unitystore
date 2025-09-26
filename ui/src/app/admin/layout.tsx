"use client";
import { ReactNode } from "react";
import AdminSidebar from "./_components/ui/sidebar";
import { AdminHeader } from "./_layout/admin-header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <AdminHeader />
      </header>
      <main className="bg-gray-50 max-h-[92vh] h-[92vh] overflow-hidden">
        <section className="max-w-6xl mx-auto px-2 md:px-4 py-4 grid grid-cols-1 sm:grid-cols-6 gap-4">
          <div className="col-span-1">
            <AdminSidebar />
          </div>
          <div className="col-span-5 w-full h-[90vh] overflow-auto bg-white rounded-lg shadow-sm border border-gray-200 hide-scrollbar">{children}</div>
        </section>
      </main>
    </>
  );
}
