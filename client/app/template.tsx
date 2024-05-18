import React from "react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

const RootTemplate = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className={"max-w-[1400px] mx-auto p-4 h-full w-full flex flex-col"}>
      <Navbar />
      <div className={"flex flex-1 w-full pt-4"}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default RootTemplate;
