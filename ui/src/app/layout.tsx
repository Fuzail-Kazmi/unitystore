import "./globals.css";
import Providers from './provider'
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Unity Store | Redefining the Art of Shopping",
  description:
    "Discover Unity Store's — your one-stop destination for quality products, unbeatable deals, and a seamless shopping experience that redefines modern e-commerce.",
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
