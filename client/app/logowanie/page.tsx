import React from "react";
import { Button, Card, Input } from "@nextui-org/react";

const LogowaniePage = () => {
  return (
    <div className={"w-full py-8"}>
      <Card className={"max-w-[400px] p-4 gap-4 mx-auto shadow-xl"}>
        <Input label={"E-mail"} />
        <Input label={"Hasło"} />
        <Button color={"primary"}>Zaloguj się</Button>
      </Card>
    </div>
  );
};

export default LogowaniePage;
