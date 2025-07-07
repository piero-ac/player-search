import BlackProfilePic from "../assets/blank-profile-photo-1.jpg";

export default function PlayerCard({
  player,
  onClick,
}: {
  player: PlayerProfile;
  onClick: () => void;
}) {
  const { player: p } = player;
  console.log(player);
  return (
    <div onClick={onClick} className="h-[200px] text-center self-center">
      <div className="w-full ">
        <img
          className="aspect-square object-cover rounded-full mx-auto"
          src={p.photo ? p.photo : BlackProfilePic}
          alt={`Photo of ${p.name}`}
        />
      </div>
      <p>{p.name}</p>
      <div className="flex flex-row justify-center gap-2">
        {p.age && <p>Age: {p.age}</p>}
        {p.nationality && <p>{p.nationality}</p>}
      </div>
      <p>ID: {p.id}</p>
    </div>
  );
}
