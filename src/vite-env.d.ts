/// <reference types="vite/client" />
interface Player {
  player: {
    id: string;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      date: string;
      place: string;
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    number: number;
    position: string;
    photo: string;
  };
}

interface PlayerResponse {
  get: string;
  parameters: {
    player: string;
  };
  errors: string[];
  results: string;
  paging: {
    current: number;
    total: number;
  };
  response: Player[];
}
