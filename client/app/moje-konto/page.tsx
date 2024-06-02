import React from "react";
import { accountMenu } from "@/lib/dictionaries";
import Link from "next/link";

const MojeKontoPage = () => {
  return (
    <div className={"h-full w-full flex"}>
      <ul className={"flex-1 flex flex-col min-w-[200px]"}>
        {accountMenu.map((item) => (
          <li key={item.name} className={"py-1 px-4"}>
            <Link href={item.path} className={"text-nowrap w-full h-full"}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div
        className={
          "h-full w-full bg-background rounded-xl flex gap-4 max-w-[1000px]"
        }
      ></div>
      <div className={"flex-1"}></div>
    </div>
  );
};

export default MojeKontoPage;
