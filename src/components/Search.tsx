import { CiSearch } from "react-icons/ci";

interface SearchProps {
  submit: (playerName: string) => void;
}

export default function Search({ submit }: SearchProps) {
  function handleSubmit(formData: FormData) {
    const query = formData.get("player-name");
    if (query) {
      submit(query.toString());
    }
  }

  return (
    <form
      className="text-center flex flex-row items-center justify-center"
      action={handleSubmit}
    >
      <input
        className="bg-gray-50 px-2 rounded h-[40px] w-[200px] text-black"
        type="text"
        name="player-name"
        id="player-name"
        min={3}
        maxLength={30}
        required
      />
      <button className="ml-3 bg-gray-500 p-3 rounded" type="submit">
        <CiSearch />
      </button>
    </form>
  );
}
