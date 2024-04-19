import './globals.css'
import { Noto_Sans_Georgian } from "next/font/google";

const georgian = Noto_Sans_Georgian({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gray-100 text-green-900">
      <body className={georgian.className}>{children}</body>
    </html>
  );
}
