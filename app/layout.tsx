import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const plusJakartaSans = localFont({
  src: "../public/fonts/PlusJakartaSans-Variable.ttf",
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  title: "ParketShop | AVM Deneyiminizin Akıllı Asistanı",
  description:
    "Boş park yeri bulma, araç konumu, AVM içi navigasyon ve kampanyalar tek uygulamada.",
  verification: {
    google: "oT-0yTaG5-91X0cj9SDtmO5PCSulh37Sjz1lSHlSH8c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${plusJakartaSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
