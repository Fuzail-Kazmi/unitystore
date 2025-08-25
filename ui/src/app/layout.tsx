import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { HeadLink } from "./(features)/_layout/head-link";
import { Header } from "./(features)/_layout/header";
import { Footer } from "./(features)/_layout/footer";

export const metadata: Metadata = {
  title: "Unity Store's | Redefining the Art of Shopping",
  description:
    "Discover Unity Store's — your one-stop destination for quality products, unbeatable deals, and a seamless shopping experience that redefines modern e-commerce.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header>
          <Header />
          <HeadLink />
        </header>

        <main className="max-w-6xl mx-auto">{children}</main>

        <footer className="border-t border-gray-200 mt-8">
          <Footer/>
        </footer>
      </body>
    </html>
  );
}