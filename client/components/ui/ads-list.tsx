"use client";
import { IAd } from "@/types";
import { ads } from "@/mock_data/data.json";
import { LocateIcon } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { Pagination } from "@nextui-org/react";

const AdListItem = ({ ad }: { ad: IAd }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className={
        "flex w-full bg-background rounded-lg p-4 shadow-sm relative dark:bg-black bg-white shadow-input gap-4"
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
          className={"scroll-m-20 text-2xl font-semibold tracking-tight my-2"}
        >
          {ad.title}
        </h3>
        <p className={"text-default-500 text-sm"}>
          {expanded ? (
            ad.description?.length > 400 ? (
              <>
                {ad.description}{" "}
                <button
                  onClick={() => setExpanded(false)}
                  className={"text-primary"}
                >
                  Pokaż mniej
                </button>
              </>
            ) : (
              ad.description
            )
          ) : (
            <>
              {ad.description?.slice(0, 400)}
              {ad.description?.length > 400 ? (
                <>
                  ...{" "}
                  <button
                    onClick={() => setExpanded(true)}
                    className={"text-primary"}
                  >
                    Pokaż więcej
                  </button>
                </>
              ) : null}
            </>
          )}
        </p>
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
    <>
      <div>
        <h2 className={"text-md font-normal tracking-tight text-right mb-2"}>
          Znalezione ogłoszenia: 2
        </h2>
      </div>
      <div className={"w-full flex flex-col gap-4"}>
        {(ads as IAd[]).map((ad: IAd, index) => (
          <AdListItem key={index} ad={ad} />
        ))}
      </div>
      <div className={"w-full flex items-center justify-center p-4 mt-8"}>
        <Pagination total={10} initialPage={1} />
      </div>
    </>
  );
};
