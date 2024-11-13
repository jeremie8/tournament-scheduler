import { Schedule } from "../logic/types";
import { getTimeSlotMatchesFromSchedule } from "../logic/utils";
import { Team } from "./Team";

function SchedulePreview({ schedule }: { schedule: Schedule }) {
  const timeslotsMatches = getTimeSlotMatchesFromSchedule(schedule);
  return (
    <div className="">
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
                <td key={match.id}>
                  <Team team={match.team1} />{" "}
                  <span className="text-slate-400">vs</span>{" "}
                  <Team team={match.team2} />
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
