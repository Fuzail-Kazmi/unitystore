"use client";
import { ReactNode, useState, useEffect } from "react";
import AdminSidebar from "./_components/ui/sidebar";
import { AdminHeader } from "./_layout/admin-header";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(isMobile ? true : false);
  }, [isMobile]);

  return (
    <>
      <header>
        <AdminHeader />
      </header>

      <main className="bg-gray-50 h-[92vh] overflow-hidden relative flex">
        <div
          className={`fixed top-0 left-0 h-full z-40 transition-all duration-500 ease-in-out bg-gray-50 shadow-sm border-r border-gray-200
            ${isSidebarOpen ? "w-64" : "w-[6px]"}`}
        >
          <div
            className={`h-full flex flex-col transition-opacity duration-300
              ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <AdminSidebar />
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-0 z-50 h-full w-6 flex items-center justify-center bg-gray-200/70
            hover:bg-gray-200 transition-all duration-500 ease-in-out cursor-pointer
            ${isSidebarOpen ? "left-64" : "left-[6px]"}`}
        >
          <span className="transition-transform duration-500 ease-in-out">
            {isSidebarOpen ? (
              <ArrowLeftToLine className="w-4 h-4 text-gray-600" />
            ) : (
              <ArrowRightToLine className="w-4 h-4 text-gray-600" />
            )}
          </span>
        </button>

        <section className="transition-all duration-300 ease-in-out flex-1 px-2 md:px-4 py-4 w-full">
          <div className="w-full h-[90vh] overflow-y-auto bg-white rounded-lg shadow-sm border border-gray-200 hide-scrollbar max-w-6xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </>
  );
}
