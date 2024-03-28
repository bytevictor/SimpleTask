import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConfigMenu from "./Components/ConfigMenu/ConfigMenu";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar bg-base-100">
          <div className="navbar-start"></div>
          <div className="navbar-end">
            <ConfigMenu />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}