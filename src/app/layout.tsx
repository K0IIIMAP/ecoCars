import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default:
      "EcoCars - Car Marketplace for people caring about the environment! Buy a car with a clear conscience",
    template: "%s - EcoCars",
  },
  description:
    "EcoCars is a marketplace where you can buy and sell cars that are environmentally friendly. We have a wide range of electric cars, hybrids, and other eco-friendly vehicles.",
};
const font = Exo_2({
  weight: ["400", "700", "100", "300", "900", "500", "600", "800"],
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-clip">
      <body className={` ${font.className} overflow-x-clip bg-[#f0f0f0] `}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
