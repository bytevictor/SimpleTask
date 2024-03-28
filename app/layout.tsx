import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainNavbar from "./Components/ConfigMenu/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SimpleTask",
  description: "A simple, fast and light task manager. Created by bytevictor.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✅</text></svg>",
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
