import Image from "next/image";
import { AdsList } from "@/components/ui/ads-list";

export default function Home() {
  return (
    <main className="px-4 h-full w-full">
      <AdsList />
    </main>
  );
}
