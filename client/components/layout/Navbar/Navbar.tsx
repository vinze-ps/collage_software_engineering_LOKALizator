"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { MegaphoneIcon, SearchIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/lib/assets/Logo.svg";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
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
            item="Ogłoszenia"
            icon={<MegaphoneIcon size={"1.25rem"} />}
          >
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">
                Interface Design
              </HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Wyszukiwanie"
            icon={<SearchIcon size={"1.25rem"} />}
          >
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Sample1"
                href="#"
                src="https://fastly.picsum.photos/id/1035/140/70.jpg?hmac=CaJT0nocyvNAQRnzOGUct3lTMjMSDsaQtjCuaf4rz_4"
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Sample2"
                href="#"
                src="https://fastly.picsum.photos/id/629/140/70.jpg?hmac=nO5aPltMaPrxRbBX4MS-NM_abPMzoyHCiAB-RhrQroQ"
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Sample3"
                href="#"
                src="https://fastly.picsum.photos/id/695/140/70.jpg?hmac=GmwO0OkJ75k_m5xVXXYNN1OeYmnS5zdT_liPGR0Gwaw"
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Sample4"
                href="#"
                src="https://fastly.picsum.photos/id/998/140/70.jpg?hmac=i2j8RXd09PE5LaK38nznSlso9sOkehzB3vfV1h-GGvY"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
            </div>
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Moje konto"
            icon={<UserIcon size={"1.25rem"} />}
          >
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/hobby">Hobby</HoveredLink>
              <HoveredLink href="/individual">Individual</HoveredLink>
              <HoveredLink href="/team">Team</HoveredLink>
              <HoveredLink href="/enterprise">Enterprise</HoveredLink>
            </div>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}
