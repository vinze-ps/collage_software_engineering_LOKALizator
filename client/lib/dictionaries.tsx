import { LockIcon, MegaphoneIcon } from "lucide-react";

export const accountMenu = [
  {
    name: "Ogłoszenia",
    path: "moje-konto/ogloszenia",
    icon: <MegaphoneIcon />,
  },
  { name: "Zmiana hasła", path: "moje-konto/zmiana-hasla", icon: <LockIcon /> },
];
