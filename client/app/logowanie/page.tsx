"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "@nextui-org/react";
import Link from "next/link";
import { useAppContext } from "@/store/app-context";
import { useRouter } from "next/navigation";

const LogowaniePage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { appState, dispatchApp } = useAppContext();

  const loginHandler = () => {
    dispatchApp({ type: "LOGIN", value: { name: email, surname: password } });
  };

  useEffect(() => {
    if (appState.userData) {
      router.push("/");
    }
  }, [appState.userData, router]);

  return (
    <div className={"w-full py-8"}>
      <Card className={"max-w-[400px] p-4 gap-x-4 mx-auto shadow-xl"}>
        <h1 className={"text-3xl font-bold mb-2"}>Logowanie</h1>
        <p className={"text-gray-500 text-sm mb-4"}>
          Zaloguj się, aby uzyskać dostęp do swojego konta i korzystać z pełni
          funkcji.
        </p>
        <form className={"w-full flex flex-col"} onSubmit={loginHandler}>
          <Input
            onValueChange={setEmail}
            value={email}
            className={"mb-4"}
            label={"E-mail"}
          />
          <Input
            onValueChange={setPassword}
            value={password}
            className={"mb-4"}
            label={"Hasło"}
          />
          <Link className={"disabled mb-4 text-primary"} href={"#"}>
            Przypomnij hasło
          </Link>
          <Button type={"submit"} onClick={loginHandler} color={"primary"}>
            Zaloguj się
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LogowaniePage;
