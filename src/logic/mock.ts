import dayjs from "dayjs";
import {
  Team,
  Pool,
  Category,
  Court,
  Match,
  Tournament,
  Schedule,
} from "./types";

// Define time slots from 9 AM to 4 PM with 1-hour intervals
const timeSlots = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  date: dayjs("2024-09-01"),
  startTime: dayjs()
    .hour(9 + i)
    .minute(0),
  endTime: dayjs()
    .hour(9 + i + 1)
    .minute(0),
}));

// Define teams for each pool
const teamA: Team = {
  id: 1,
  name: "Team Alpha",
  logo: "https://placehold.co/100/orange/white?text=A",
};
const teamB: Team = {
  id: 2,
  name: "Team Bravo",
  logo: "https://placehold.co/100/red/white?text=B",
};
const teamC: Team = {
  id: 3,
  name: "Team Charlie",
  logo: "https://placehold.co/100/green/white?text=C",
};
const teamD: Team = {
  id: 4,
  name: "Team Delta",
  logo: "https://placehold.co/100/blue/white?text=D",
};

const teamE: Team = {
  id: 5,
  name: "Team Echo",
  logo: "https://placehold.co/100/black/white?text=E",
};
const teamF: Team = {
  id: 6,
  name: "Team Foxtrot",
  logo: "https://placehold.co/100/gray/white?text=F",
};
const teamG: Team = {
  id: 7,
  name: "Team Golf",
  logo: "https://placehold.co/100/pink/black?text=G",
};
const teamH: Team = {
  id: 8,
  name: "Team Hotel",
  logo: "https://placehold.co/100/purple/white?text=H",
};

// Define pools and categories with 4 teams each
const pool1: Pool = {
  id: 1,
  name: "Pool A",
  teams: [teamA, teamB, teamC, teamD],
};
const pool2: Pool = {
  id: 2,
  name: "Pool B",
  teams: [teamE, teamF, teamG, teamH],
};

const category1: Category = { id: 1, name: "C", pools: [pool1] };
const category2: Category = { id: 2, name: "D", pools: [pool2] };

// Define courts
const court1: Court = { id: 1, timeSlots };
const court2: Court = { id: 2, timeSlots };

// Helper function to generate matches for teams in a pool
function generatePoolMatches(
  teams: Team[],
  pool: Pool,
  category: Category,
  courts: Court[]
): Match[] {
  const matches: Match[] = [];
  let matchId = 1;

  // Generate a round-robin style match schedule for each court and time slot
  let timeSlotIndex = 0;
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const court = courts[timeSlotIndex % courts.length];
      const timeSlot = court.timeSlots[timeSlotIndex % court.timeSlots.length];

      matches.push({
        id: matchId++,
        timeSlot,
        court,
        category,
        pool,
        team1: teams[i],
        team2: teams[j],
      });

      timeSlotIndex++;
      if (timeSlotIndex >= courts.length * court.timeSlots.length) {
        // If we've reached the end of available time slots, break out of the loop
        return matches;
      }
    }
  }

  return matches;
}

// Generate matches for both categories
const matches = [
  ...generatePoolMatches(pool1.teams, pool1, category1, [court1, court2]),
  ...generatePoolMatches(pool2.teams, pool2, category2, [court1, court2]),
];

// Define the tournament
export const tournament: Tournament = {
  name: "Two-Court One-Day Tournament",
  startDate: dayjs().hour(9).minute(0),
  endDate: dayjs().hour(16).minute(0),
  categories: [category1, category2],
  courts: [court1, court2],
  options: {
    minNbOfMatchesPerTeam: 1,
    gameDurationInMinutes: 60,
    breakDurationInMinutes: 0,
    shouldTeamsRefGames: false,
    keepCategoriesOnSameCourts: false,
  },
};

// Generated schedule
export const generatedSchedule: Schedule = {
  matches,
  tournament,
};
