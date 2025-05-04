import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { Climb} from "@moonbored/types"


type GlobalContextType = {
  win95Mode: boolean;
  themeToggle: () => void;
  getAllClimbs: () => void;
  allClimbs: Climb[];
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL!;

  const [win95Mode, setWin95Mode] = useState(
    () => localStorage.getItem("theme") === "win95"
  );
  const [allClimbs, setAllClimbs] = useState<Climb[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (win95Mode) {
      root.classList.add("win95");
      localStorage.setItem("theme", "win95");
    } else {
      root.classList.remove("win95");
      localStorage.setItem("theme", "default");
    }
  }, [win95Mode]);

  const themeToggle = () => setWin95Mode((prev) => !prev);

  // get all climbs
  const getAllClimbs = async () => {
    try {
      const response = await axios.get<Climb[]>(`${serverUrl}/api/database/climbs`);
      setAllClimbs(response.data);
    } catch (error) {
      console.log("error getting all climbs:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{ win95Mode, themeToggle, getAllClimbs, allClimbs }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within GlobalProvider");
  return context;
};
