import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import PlayerCard from "../components/PlayerCard";
import Search from "../components/Search";
import { popularPlayers } from "../players";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

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
        },
      );

      if (!res.ok) {
        throw new Error(
          "Could not fetch players by name. Please try again later.",
        );
      }

      const data = await res.json();
      // console.log(data);
      return data;
    },
    staleTime: 50000,
    enabled: !!name,
  });

  let playerCardContent;

  if (isProfileError) {
    playerCardContent = <p>Something went wrong. {profileError.message}</p>;
  }

  if (isProfilePending) {
    playerCardContent = <p>Searching....</p>;
  }

  if (!name) {
    playerCardContent = (
      <div className="p-4">
        <h2 className="text-center uppercase font-bold">
          Type a name in the search bar or Click one of the following players!
        </h2>
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 max-w-[900px] mx-auto">
          {popularPlayers.map((p) => (
            <PlayerCard
              onClick={() => navigate({ to: `/player/${p.player.id}` })}
              key={p.player.id}
              player={p}
            />
          ))}
        </div>
      </div>
    );
  }

  if (profileData) {
    playerCardContent = (
      <div className="p-4">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p>Searched: {name}</p>
          <p>Found {profileData.results} players</p>
        </div>
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 max-w-[900px] mx-auto ">
          {profileData.response.map((p) => (
            <PlayerCard
              onClick={() => navigate({ to: `/player/${p.player.id}` })}
              key={p.player.id}
              player={p}
            />
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
        <Search
          submit={(playerName) => {
            setName(playerName);
          }}
        />
      </div>
      <div>{playerCardContent}</div>
    </div>
  );
}
