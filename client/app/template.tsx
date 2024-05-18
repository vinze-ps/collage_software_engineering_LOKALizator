import React from "react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

const RootTemplate = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      <div className={"flex h-full w-full p-4 pt-24"}>
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default RootTemplate;
