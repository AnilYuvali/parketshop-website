import type { Metadata } from "next";
import { AvmIndoorLanding } from "@/components/avm-indoor-landing";

export const metadata: Metadata = {
  title: "AVM İçi Deneyim | ParketShop",
  description:
    "ParketShop ile AVM içinde mağaza ve restoranları keşfedin, kampanyaları görün, yapay zeka destekli bildirimler alın ve canlı navigasyonla hedefinize ulaşın.",
};

export default function AvmIndoorPage() {
  return <AvmIndoorLanding />;
}
