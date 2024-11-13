import { useEffect, useState } from "react";
import { Team as TeamType } from "../logic/types";

export function Team({
  team,
  reverse = false,
  state = "default",
  color = "default",
  cursor = "cursor-auto",
}: {
  team: TeamType;
  reverse?: boolean;
  state?: "default" | "selected";
  color?: "default" | "blue" | "red";
  cursor?: "cursor-pointer" | "cursor-auto";
}) {
  const [bgColor, setBgColor] = useState("");
  const [borderColor, setBorderColor] = useState("border-slate-300");

  useEffect(() => {
    switch (color) {
      case "blue":
        if (state === "selected") {
          setBgColor("bg-blue-200");
          setBorderColor("border-blue-200");
        } else {
          setBgColor("");
          setBorderColor("border-blue-100");
        }
        break;
      case "red":
        if (state === "selected") {
          setBgColor("bg-red-200");
          setBorderColor("border-red-200");
        } else {
          setBgColor("");
          setBorderColor("border-red-100");
        }
        break;
      default:
        setBgColor("");
        setBorderColor("border-slate-300");
        break;
    }
  }, [state, color]);

  return (
    <div
      className={`transition-colors duration-200 flex flex-row gap-1.5 items-center rounded-md border p-2 ${borderColor} ${bgColor} ${cursor} ${
        color === "blue"
          ? "hover:bg-blue-200 hover:border-blue-100"
          : color === "red"
          ? "hover:bg-red-200 hover:border-red-100"
          : ""
      }`}
    >
      <img
        src={team.logo}
        alt={team.name}
        className={`rounded-full h-8 w-8 ${reverse ? "order-1" : "order-0"}`}
      />
      <span>{team.name}</span>
    </div>
  );
}
