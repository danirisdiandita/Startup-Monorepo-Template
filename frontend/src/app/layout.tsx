import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import StoreProvider from "./StoreProvider";
import { Toaster } from 'sonner'; 
const inter = Inter({ subsets: ["latin"] });
const plus_jakarta_san = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <StoreProvider>
        <html lang="en">
          <body className={plus_jakarta_san.className}>{children}</body>
          <Toaster richColors/>
        </html>
      </StoreProvider>
    </SessionWrapper>
  );
}
