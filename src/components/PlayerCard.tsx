export default function PlayerCard({ player }: { player: Player }) {
  const { player: p } = player;
  return (
    <div className="h-[200px] text-center self-center">
      <div className="w-full ">
        <img
          className="aspect-square object-cover rounded-full mx-auto"
          src={p.photo}
          alt={`Photo of ${p.name}`}
        />
      </div>
      <p>{p.name}</p>
      <div className="flex flex-row justify-center gap-2">
        {p.age && <p>Age: {p.age}</p>}
        {p.nationality && <p>{p.nationality}</p>}
      </div>
    </div>
  );
}
