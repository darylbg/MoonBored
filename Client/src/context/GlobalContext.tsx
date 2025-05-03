import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import {User, Climb} from "@moonbored/types"


type GlobalContextType = {
  darkMode: boolean;
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

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [allClimbs, setAllClimbs] = useState<Climb[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const themeToggle = () => setDarkMode((prev) => !prev);

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
      value={{ darkMode, themeToggle, getAllClimbs, allClimbs }}
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
