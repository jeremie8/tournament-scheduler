import { Team as TeamType } from "../logic/types";

export function Team({
  team,
  reverse = false,
}: {
  team: TeamType;
  reverse?: boolean;
}) {
  return (
    <div className="flex flex-row gap-1.5 items-center rounded-md border border-slate-300 p-2">
      <img
        src={team.logo}
        alt={team.name}
        className={`rounded-full h-8 w-8 ${reverse ? "order-1" : "order-0"}`}
      />
      <span>{team.name}</span>
    </div>
  );
}
