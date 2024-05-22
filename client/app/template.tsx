import React from "react";
import { Navbar } from "@/components/layout/Navbar/Navbar";

const RootTemplate = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className={"max-w-[1400px] mx-auto p-2 h-full w-full flex flex-col"}>
      <Navbar />
      <div className={"flex flex-1 w-full pt-2"}>{children}</div>
    </div>
  );
};

export default RootTemplate;
