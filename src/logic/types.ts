import dayjs from "dayjs";

export type Schedule = {
  matches: Match[];
  tournament: Tournament;
}

export type Match = {
  id: number;
  timeSlot: TimeSlot;
  court: Court;
  category: Category;
  pool: Pool;
  team1: Team;
  team2: Team;
  refTeam?: Team;
}

export type Tournament = {
  name: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  categories: Category[];
  courts: Court[];
  options: {
    minNbOfMatchesPerTeam: number;
    gameDurationInMinutes: number;
    breakDurationInMinutes: number;
    shouldTeamsRefGames: boolean;
    keepCategoriesOnSameCourts: boolean;
    //TODO implement these maybe later
    //type: "round-robin" | "single-elimination" | "double-elimination";
    //optimize: 'court-end' | 'tournament-duration' | 'category-duration';
  };
};

export type Court = {
  id: number;
  timeSlots: TimeSlot[];
};

export type TimeSlot = {
  id: number;
  date: dayjs.Dayjs;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
}

export type Category = {
  id: number;
  name: string;
  pools: Pool[];
};

export type Pool = {
  id: number;
  name: string;
  teams: Team[];
};

export type Team = {
  id: number;
  logo?: string;
  name?: string;
  players?: Player[];
};

export type Player = {
  id: number;
  name: string;
};
