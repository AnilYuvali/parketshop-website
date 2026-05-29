import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../public/fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  title: "ParketShop | AVM Deneyiminizin Akıllı Asistanı",
  description:
    "Boş park yeri bulma, araç konumu, AVM içi navigasyon ve kampanyalar tek uygulamada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${manrope.variable} antialiased`}>{children}</body>
    </html>
  );
}
