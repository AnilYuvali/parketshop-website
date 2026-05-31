import type { Metadata } from "next";
import { AvmIndoorLanding } from "@/components/avm-indoor-landing";

export const metadata: Metadata = {
  title: "AVM İçi Deneyim | ParketShop",
  description:
    "ParketShop ile AVM içindeki mağazaları bulun, kampanyaları keşfedin, yapay zeka destekli kişisel öneriler alın ve canlı navigasyonla hedefinize ulaşın.",
};

export default function AvmIndoorPage() {
  return <AvmIndoorLanding />;
}
