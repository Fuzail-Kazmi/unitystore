import { ReactNode } from "react";
import { Header } from "../_layout/header";
import { Footer } from "../_layout/footer";
import { HeadLink } from "../_layout/head-link";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Header />
        <HeadLink />
      </header>
      <main className="max-w-6xl mx-auto">{children}</main>
      <footer className="border-t border-gray-200 mt-8">
        <Footer />
      </footer>
    </>
  );
}
 