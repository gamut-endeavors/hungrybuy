import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Hungrybuy Admin",
  description: "Made by Gamut Endeavors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#f1f9fb]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
