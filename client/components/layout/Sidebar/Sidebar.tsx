import React from "react";
import { FilterIcon } from "lucide-react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { categories } from "@/mock_data/data.json";

const Sidebar = () => {
  return (
    <div
      className={
        "shadow-sm relative dark:bg-black bg-white shadow-input items-start justify-start space-x-4 p-4 h-full w-auto rounded-lg flex flex-col gap-2 min-w-[240px]"
      }
    >
      <div className={"flex justify-center items-center gap-4"}>
        <FilterIcon />
        <h2 className="scroll-m-20 border-b text-2xl font-semibold tracking-tight">
          Filtry
        </h2>
      </div>
      <CheckboxGroup
        className={"!mx-0 !mt-4 w-full"}
        label="Kategorie"
        defaultValue={[]}
      >
        {categories.map((category) => {
          return (
            <Checkbox key={category.id} value={category.id.toString()}>
              {category.name}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
    </div>
  );
};

export default Sidebar;
