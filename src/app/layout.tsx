import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AllProvider from "../provider/AllProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Oneself",
    template: "%s | Oneself",
  },
  description: "Oneself",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AllProvider>
          <main className="max-w-screen-2xl mx-auto relative">
            {children}
            <Toaster />
          </main>
        </AllProvider>
      </body>
    </html>
  );
}
