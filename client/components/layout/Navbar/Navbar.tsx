"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import {
  LogOutIcon,
  MegaphoneIcon,
  SearchIcon,
  StarIcon,
  User2Icon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/lib/assets/Logo.svg";
import { Input } from "@nextui-org/react";
import { useAppContext } from "@/store/app-context";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { appState, dispatchApp } = useAppContext();

  return (
    <div className={cn("w-full mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <Image src={Logo.src} alt="logo" width={80} height={40} />
        </Link>
        <div
          className={
            "flex items-center justify-center gap-4 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
          }
        >
          <MenuItem
            setActive={setActive}
            active={active}
            item="Popularne"
            icon={<StarIcon className={"text-default-400"} size={"1rem"} />}
          >
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Nieruchomości"
                href="#"
                src="https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?cs=srgb&dl=pexels-marketingtuig-87223.jpg&fm=jpg&w=640&h=387&_gl=1*1hcmyeg*_ga*Mzc1NzAxMDAwLjE3MTA5NjU0NDM.*_ga_8JE65Q40S6*MTcxNjIyNDU0Ny41LjEuMTcxNjIyNDYyNC4wLjAuMA.."
                description="Znajdź swoje wymarzone mieszkanie"
              />
              <ProductItem
                title="Praca"
                href="#"
                src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?cs=srgb&dl=pexels-elevate-1267338.jpg&fm=jpg&w=640&h=427&_gl=1*p7pcae*_ga*Mzc1NzAxMDAwLjE3MTA5NjU0NDM.*_ga_8JE65Q40S6*MTcxNjIyNDU0Ny41LjEuMTcxNjIyNDc0My4wLjAuMA.."
                description="Tysiące ofert pracy w jednym miejscu"
              />
              <ProductItem
                title="Ogłoszenia"
                href="#"
                src="https://images.pexels.com/photos/10817551/pexels-photo-10817551.jpeg?cs=srgb&dl=pexels-narcissan-10817551.jpg&fm=jpg&w=640&h=360&_gl=1*1a2vu4e*_ga*Mzc1NzAxMDAwLjE3MTA5NjU0NDM.*_ga_8JE65Q40S6*MTcxNjIyNDU0Ny41LjEuMTcxNjIyNDk3Mi4wLjAuMA.."
                description="Kupuj i sprzedawaj w największym portalu ogłoszeniowym"
              />
            </div>
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Moje konto"
            icon={<UserIcon className={"text-default-400"} size={"1rem"} />}
            href={appState.userData ? undefined : "/logowanie"}
          >
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink onClick={() => {}} href="/moje-konto">
                <User2Icon size={"1rem"} />
                Panel konta
              </HoveredLink>
              <HoveredLink
                onClick={() => {
                  dispatchApp({ type: "LOGOUT" });
                }}
                href="#"
              >
                <LogOutIcon size={"1rem"} />
                Wyloguj się
              </HoveredLink>
            </div>
          </MenuItem>
        </div>
        <Input
          placeholder={"Wpisz wyszukiwaną frazę, kategorię..."}
          endContent={<SearchIcon size={"1rem"} />}
          className={"max-w-[300px]"}
        />
      </Menu>
    </div>
  );
}
