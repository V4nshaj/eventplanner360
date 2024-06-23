import type { Metadata } from "next";
import { Poppins } from "next/font/google";//imports font design poppins
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "EventPlanner360",
  description: "EventPlanner360 helps you plan and organize your events",
  icons: {
    icon: '/asssets/images/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
