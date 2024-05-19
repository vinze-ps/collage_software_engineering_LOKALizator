import { IAd } from "@/types";
import { ads } from "@/mock_data/data.json";
import Image from "next/image";
import { LocateIcon } from "lucide-react";
import moment from "moment";

const AdListItem = ({ ad }: { ad: IAd }) => {
  return (
    <div
      className={
        "flex w-full bg-background rounded-lg p-4 shadow-sm relative border dark:bg-black dark:border-white/[0.2] bg-white shadow-input gap-4"
      }
    >
      <div>
        <div className={"text-xs flex items-center gap-1.5"}>
          <LocateIcon size={"0.9rem"} />
          {ad.location}
          <span className={"text-default-500"}>
            {moment(ad.date).format("DD-MM-YYYY")}
          </span>
          <div>
            {ad.tags.map((tag, index) => (
              <span
                key={index}
                className={
                  "bg-primary-50 text-primary-500 px-1.5 py-0.5 rounded-full text-xs mr-2"
                }
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3
          className={"scroll-m-20 text-2xl font-semibold tracking-tight mb-4"}
        >
          {ad.title}
        </h3>
        <p className={"text-default-500 text-sm"}>{ad.description}</p>
      </div>
      <div
        className={"min-w-[200px] w-[200px] h-[200px] bg-default-50 rounded-lg"}
      >
        <img
          className={"max-h-full max-w-full m-auto"}
          src={ad.imagesUrls[0]}
          alt={"ad"}
        />
      </div>
    </div>
  );
};

export const AdsList = () => {
  return (
    <div className={"w-full flex flex-col gap-4"}>
      {(ads as IAd[]).map((ad: IAd, index) => (
        <AdListItem key={index} ad={ad} />
      ))}
    </div>
  );
};
