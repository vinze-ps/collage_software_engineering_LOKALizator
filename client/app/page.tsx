import { AdsList } from "@/components/ui/ads-list";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import React from "react";

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="ps-4 h-full w-full">
        <AdsList />
      </main>
    </>
  );
}
