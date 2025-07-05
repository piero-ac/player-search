/// <reference types="vite/client" />
interface PlayerProfile {
  player: {
    id: string;
    name: string | null;
    firstname: string | null;
    lastname: string | null;
    age: number | null;
    birth: {
      date: string | null;
      place: string | null;
      country: string | null;
    };
    nationality: string | null;
    height: string | null;
    weight: string | null;
    number: number | null;
    position: string | null;
    photo: string | null;
  };
}

interface PlayerProfileResponse {
  get: "players/profiles";
  parameters: {
    player: string;
  };
  errors: string[];
  results: string;
  paging: {
    current: number;
    total: number;
  };
  response: PlayerProfile[];
}

interface PlayerStatistics {
  team: {
    id: number | null;
    name: string | null;
    logo: string | null;
  };
  league: {
    id: number | null;
    name: string | null;
    country: string | null;
    logo: string | null;
    flag: string | null;
    season: number | null;
  };
  games: {
    appearences: number | null;
    lineups: number | null;
    minutes: number | null;
    number: number | null;
    position: string | null;
    rating: string | null;
    captain: boolean | null;
  };
  substitutes: {
    in: number | null;
    out: number | null;
    bench: number | null;
  };
  shots: {
    total: number | null;
    on: number | null;
  };
  goals: {
    total: number | null;
    conceded: number | null;
    assists: number | null;
    saves: number | null;
  };
  passes: {
    total: number | null;
    key: number | null;
    accuracy: number | null;
  };
  tackles: {
    total: number | null;
    blocks: number | null;
    interceptions: number | null;
  };
  duels: {
    total: number | null;
    won: number | null;
  };
  dribbles: {
    attempts: number | null;
    success: number | null;
    past: number | null;
  };
  fouls: {
    drawn: number | null;
    committed: number | null;
  };
  cards: {
    yellow: number | null;
    yellowred: number | null;
    red: number | null;
  };
  penalty: {
    won: number | null;
    commited: number | null;
    scored: number | null;
    missed: number | null;
    saved: number | null;
  };
}

interface PlayerStatisticsResponse {
  get: "players";
  parameters: {
    id: string;
    season: string;
  };
  errors: string[];
  results: string;
  paging: {
    current: number;
    total: number;
  };
  response: {
    player: Omit<PlayerProfile["player"], "number" | "position"> & {
      injured: boolean;
    };

    statistics: PlayerStatistics[];
  }[];
}

interface PlayerSeasonsResponse {
  get: "players/seasons";
  parameters: {
    id: string;
    season: string;
  };
  errors: string[];
  results: string;
  paging: {
    current: number;
    total: number;
  };
  response: number[];
}
