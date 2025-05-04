import { useGlobalContext } from "../context/GlobalContext";

export default function Home() {
  const { win95Mode } = useGlobalContext();
  return (
    <>
      <div className={`flex flex-1 flex-col gap-2 win95:bg-win95-white p-1`}>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>

        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        <p className="h-15">Home</p>
        
      </div>
    </>
  );
}
