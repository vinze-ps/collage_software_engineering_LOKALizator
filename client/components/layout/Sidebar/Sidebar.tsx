import React from "react";
import { FilterIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <div
      className={
        "shadow-sm relative border dark:bg-black dark:border-white/[0.2] bg-white shadow-input items-start justify-start space-x-4 px-8 py-4 h-full w-auto rounded-lg flex gap-2 min-w-[240px]"
      }
    >
      <div className={"flex justify-center items-center gap-4"}>
        <FilterIcon />
        <h2 className="scroll-m-20 border-b text-2xl font-semibold tracking-tight">
          Filtry
        </h2>
      </div>
    </div>
  );
};

export default Sidebar;
