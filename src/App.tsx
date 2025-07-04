import { useQuery } from "@tanstack/react-query";
import Search from "./components/Search";
import { useState } from "react";
import PlayerCard from "./components/PlayerCard";

function App() {
  const [name, setName] = useState("");
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["players", name],
    queryFn: async (): Promise<PlayerResponse> => {
      const res = await fetch(
        `https://v3.football.api-sports.io/players/profiles?search=${name}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": import.meta.env.VITE_API_FOOTBALL_KEY,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Could not fetch data");
      }

      const data = await res.json();
      // console.log(data);
      return data;
    },
    staleTime: 50000,
    enabled: !!name,
  });

  let content;

  if (isError) {
    content = <p>Something went wrong. {error.message}</p>;
  }

  if (isPending) {
    content = <p>Searching....</p>;
  }

  if (!name) {
    content = (
      <h2 className="text-center uppercase font-bold">
        Type a name in the search bar!
      </h2>
    );
  }

  if (data) {
    console.log(data.response);
    content = (
      <div className="p-4">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p>Searched: {name}</p>
          <p>Found {data.results} players</p>
        </div>
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 max-w-[900px] mx-auto">
          {data.response.map((p) => (
            <PlayerCard key={p.player.id} player={p} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 h-screen text-gray-200">
      <h1 className="pt-5 text-center text-2xl font-bold">
        FOOTBALL PLAYER SEARCH
      </h1>
      <div className="mt-4 p-4 bg-gray-600">
        <Search submit={(playerName) => setName(playerName)} />
      </div>
      <div>{content}</div>
    </div>
  );
}

export default App;
