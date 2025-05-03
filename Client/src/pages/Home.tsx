import { useGlobalContext } from "../context/GlobalContext";

export default function Home() {
  const { getAllClimbs, allClimbs } = useGlobalContext();
  console.log(allClimbs);
  return (
    <div>
      home
      <button onClick={getAllClimbs}>get all climbs</button>
    </div>
  );
}
