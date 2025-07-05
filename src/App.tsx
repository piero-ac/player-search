import { useQuery } from "@tanstack/react-query";
import Search from "./components/Search";
import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import PlayerPage from "./components/PlayerPage";

function App() {
  const [name, setName] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerProfile | null>(
    null
  );

  const {
    data: profileData,
    isError: isProfileError,
    error: profileError,
    isPending: isProfilePending,
  } = useQuery({
    queryKey: ["players", name],
    queryFn: async (): Promise<PlayerProfileResponse> => {
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

  const {
    data: seasonsData,
    // isError: isSeasonError,
    // error: seasonsError,
    // isPending: isSeasonsPending,
  } = useQuery({
    queryKey: ["seasons", selectedPlayer?.player.id],
    queryFn: async (): Promise<PlayerSeasonsResponse> => {
      const res = await fetch(
        `https://v3.football.api-sports.io/players/seasons?player=${selectedPlayer?.player.id}`,
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
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!selectedPlayer,
  });

  let profileContent;

  if (isProfileError) {
    profileContent = <p>Something went wrong. {profileError.message}</p>;
  }

  if (isProfilePending) {
    profileContent = <p>Searching....</p>;
  }

  if (!name) {
    profileContent = (
      <h2 className="text-center uppercase font-bold">
        Type a name in the search bar!
      </h2>
    );
  }

  if (profileData) {
    console.log(profileData.response);
    profileContent = (
      <div className="p-4">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p>Searched: {name}</p>
          <p>Found {profileData.results} players</p>
        </div>
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 max-w-[900px] mx-auto">
          {profileData.response.map((p) => (
            <PlayerCard
              selectPlayer={() => setSelectedPlayer(p)}
              key={p.player.id}
              player={p}
            />
          ))}
        </div>
      </div>
    );
  }

  console.log(selectedPlayer);
  let statisticsContent = <></>;
  if (selectedPlayer && seasonsData) {
    statisticsContent = (
      <>
        <button onClick={() => setSelectedPlayer(null)}>Back</button>
        <PlayerPage
          id={selectedPlayer.player.id}
          seasons={seasonsData.response as number[]}
        />
      </>
    );
  }

  return (
    <div className="bg-gray-800 h-screen text-gray-200">
      <h1 className="pt-5 text-center text-2xl font-bold">
        FOOTBALL PLAYER SEARCH
      </h1>
      <div className="mt-4 p-4 bg-gray-600">
        <Search
          submit={(playerName) => {
            setName(playerName);
            setSelectedPlayer(null);
          }}
        />
      </div>
      <div>{selectedPlayer ? statisticsContent : profileContent}</div>
    </div>
  );
}

export default App;
