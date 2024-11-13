import { Match, Schedule, TimeSlot } from "./types";

export function getTimeSlotMatchesFromSchedule(
  schedule: Schedule
): { timeSlot: TimeSlot; matches: Match[] }[] {
  const timeSlotMatches: { timeSlot: TimeSlot; matches: Match[] }[] = [];

  schedule.matches.forEach((match) => {
    const timeSlotMatch = timeSlotMatches.find(
      (tsm) => tsm.timeSlot.id === match.timeSlot.id
    );

    if (timeSlotMatch) {
      timeSlotMatch.matches.push(match);
    } else {
      timeSlotMatches.push({
        timeSlot: match.timeSlot,
        matches: [match],
      });
    }
  });

  return timeSlotMatches;
}
