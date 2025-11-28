import ServerList from "~/Components/ServerList";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CLEARNET" },
    { name: "description", content: "Welcome to CLEARNET!" },
  ];
}

export default function Home() {
  return(
    <ServerList />
  );
}
