import { useState } from "react";
import { Schedule } from "../logic/types";
import { getTimeSlotMatchesFromSchedule } from "../logic/utils";
import { Team } from "./Team";

function SchedulePreview({ schedule }: { schedule: Schedule }) {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  const timeslotsMatches = getTimeSlotMatchesFromSchedule(schedule);
  return (
    <div className="flex flex-row gap-32">
      <div className="min-w-44 space-y-2">
        <h1 className="dark:text-white">Teams</h1>
        {schedule.tournament.categories.map((c) => (
          <div
            key={c.id}
            className="p-2 bg-blue-50 rounded-md border border-blue-100"
          >
            <h2>Category {c.name}</h2>
            <div className="space-y-2">
              {c.pools
                .flatMap((p) => p.teams)
                .map((t) => (
                  <div onClick={() => setSelectedTeam(t.id)}>
                    <Team
                      key={t.id}
                      team={t}
                      state={selectedTeam === t.id ? "selected" : "default"}
                      color="blue"
                      cursor="cursor-pointer"
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <table className="table-auto">
        <thead>
          <th>Time slot</th>
          {schedule.tournament.courts.map((c) => (
            <th key={c.id}>Court {c.id}</th>
          ))}
        </thead>
        <tbody>
          {timeslotsMatches.map((timeSlotMatches) => (
            <tr key={timeSlotMatches.timeSlot.id} className="h-full">
              <td className="h-full">
                <div className="flex flex-col justify-between h-full grow">
                  <span className="font-bold">
                    {timeSlotMatches.timeSlot.startTime.format("HH:mm")}
                  </span>
                  <span className="text-slate-400">
                    {timeSlotMatches.timeSlot.endTime.format("HH:mm")}
                  </span>
                </div>
              </td>
              {timeSlotMatches.matches.map((match) => (
                <td key={match.id} className="transition-colors duration-200">
                  <Team
                    team={match.team1}
                    color={match.team1.id === selectedTeam ? "red" : "default"}
                    state={
                      match.team1.id === selectedTeam ? "selected" : "default"
                    }
                  />{" "}
                  <span className="text-slate-400">vs</span>{" "}
                  <Team
                    team={match.team2}
                    color={match.team2.id === selectedTeam ? "red" : "default"}
                    state={
                      match.team2.id === selectedTeam ? "selected" : "default"
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SchedulePreview;
