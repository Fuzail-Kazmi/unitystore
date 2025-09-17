import "./globals.css";
import Providers from './provider'
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Al Hameed Computers – Gaming PCs, Laptops & Accessories",
  description:
    "Al Hameed Computers is Karachi&#039;s trusted computer shop for gaming PCs, graphics cards, motherboards, and accessories—all at affordable and competitive prices.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) { 
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Providers >
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
