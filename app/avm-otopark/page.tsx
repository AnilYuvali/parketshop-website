import type { Metadata } from "next";
import { AvmParkingLanding } from "@/components/avm-parking-landing";

export const metadata: Metadata = {
  title: "AVM Otopark | ParketShop",
  description:
    "ParketShop ile AVM otopark doluluğunu görün, yapay zeka destekli boş park yeri bulun, aracınızı kaydedin ve otopark ücretinizi uygulamadan ödeyin.",
};

export default function AvmParkingPage() {
  return <AvmParkingLanding />;
}
