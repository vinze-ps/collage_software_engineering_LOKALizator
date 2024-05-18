"use client";
import React from "react";
import { AppProvider } from "@/store/app-context";
import { NextUIProvider } from "@nextui-org/react";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <NextUIProvider>
      <AppProvider>{children}</AppProvider>
    </NextUIProvider>
  );
};

export default Providers;
