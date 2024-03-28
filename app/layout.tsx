import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainNavbar from "./Components/ConfigMenu/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SimpleTask",
  description: "A simple, fast and light task manager. Created by bytevictor.",
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}
