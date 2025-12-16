import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientProvider from "./ClientProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SlotMaster - Free Online Slot Games",
  description: "Play free slot games online. No real money involved. Just fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white`}>
        <ClientProvider>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" theme="dark" richColors />
        </ClientProvider>
      </body>
    </html>
  );
}
