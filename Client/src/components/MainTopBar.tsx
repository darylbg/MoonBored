import { useGlobalContext } from "../context/GlobalContext";
import ControllerConnectedIcon from "../assets/icons/win95_icons/IR-Port (green).ico";
import ControllerDisconnectedIcon from "../assets/icons/win95_icons/IR-Port (red).ico";
import ControllerErrorIcon from "../assets/icons/win95_icons/IR-Port Warning (Green & Red).ico";
import ControllerConnectingIcon from "../assets/icons/win95_icons/IR-Port transfer grogress(Red & Green).ico";

interface MainTopBarProps {
  icon?: React.ReactNode;
  title?: string;
}

export default function MainTopBar({ icon, title }: MainTopBarProps) {
  const { win95Mode } = useGlobalContext();
  return (
    <div className="flex flex-row items-center">
      <div
        className={`flex flex-grow flex-row items-center justify-between py-[1px] px-[4px] win95:bg-win95-blue ${
          win95Mode ? "win95-border-2" : ""
        } p-1`}
      >
        <div className="flex flex-row items-center gap-2">
          {icon && <div>{icon}</div>}
          {title && <p className="win95:text-win95-white truncate">{title}</p>}
        </div>
      </div>
      <div
        className={`flex flex-grow-0 flex-row items-center gap-2 px-1 win95:bg-win95-grey`}
      >
        <div className="flex flex-row items-center gap-2">
          <span>controller status</span>
          <div
            className={`flex items-center justify-center p-[2px] bg-white ${
              win95Mode ? "win95-border-2" : ""
            }`}
          >
            <img src={ControllerConnectedIcon} alt="controller status" />
          </div>
        </div>
      </div>
    </div>
  );
}
