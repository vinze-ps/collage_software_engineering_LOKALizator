"use client";
import React from "react";
import { FilterIcon } from "lucide-react";
import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Slider,
  SliderValue,
} from "@nextui-org/react";
import { categories } from "@/mock_data/data.json";

const Sidebar = () => {
  const [value, setValue] = React.useState<SliderValue>([0, 10000]);

  return (
    <div
      className={
        "shadow-sm relative dark:bg-black bg-white shadow-input items-start justify-start space-x-4 p-4 h-full w-auto rounded-xl flex flex-col gap-2 min-w-[240px]"
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
      <RadioGroup value={"free"} className={"!mx-0 !mt-4 w-full"} label="Cena">
        <Radio value="free">Darmowe</Radio>
        <Radio value="free-and-paid">Darmowe i płatne</Radio>
      </RadioGroup>
      <div className="flex flex-col gap-2 w-full max-w-md items-start justify-center !ms-0 !mt-4">
        <Slider
          formatOptions={{ style: "currency", currency: "USD" }}
          step={10}
          maxValue={10000}
          minValue={0}
          value={value}
          onChange={setValue}
          className="max-w-md"
        />
        <p className="text-default-500 font-medium text-small">
          Zakres cenowy:{" "}
          {Array.isArray(value) && value.map((b) => `${b}zł`).join(" – ")}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
