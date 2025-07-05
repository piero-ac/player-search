import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function PlayerPage({
  id,
  seasons,
}: {
  id: string;
  seasons: number[];
}) {
  const [shownSeason, setShownSeason] = useState(seasons[0]);

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["players", id, shownSeason],
    queryFn: async (): Promise<PlayerStatisticsResponse> => {
      const res = await fetch(
        `https://v3.football.api-sports.io/players?id=${id}&season=${shownSeason}`,
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
  });

  let content;

  if (isError) {
    content = <p>Something went wrong. {error.message}</p>;
  }

  if (isPending) {
    content = <p>Searching....</p>;
  }

  if (data) {
    console.log(data);
    const { response } = data;

    const playerData = response[0].player;
    const statistics = response[0].statistics;
    content = (
      <div>
        <select
          onChange={(e) => setShownSeason(Number(e.target.value))}
          name="player-season"
          id="player-season"
        >
          {seasons.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p>Name: {playerData.name}</p>
        <p>League: {statistics[0].league.name}</p>
        <p>Team: {statistics[0].team.name}</p>
      </div>
    );
  }

  return <div className="p-4">{content}</div>;
}
