import NavLinkComponent from "./Buttons/NavLinkComponent";
import WindowsLogoIcon from "../assets/icons/win95_icons/Windows logo (without text).ico";
import NewFolderIcon from "../assets/icons/win95_icons/New folder.ico";
import DocumentsFolderIcon from "../assets/icons/win95_icons/Documents folder.ico";
import SettingsIcon from "../assets/icons/win95_icons/Settings.ico";
import { useGlobalContext } from "../context/GlobalContext";  

export default function MainMenu() {
  const { win95Mode } = useGlobalContext();
  return (
    <div
      className={`flex p-1 bg-white win95:bg-win95-grey ${
        win95Mode ? "win95-border-1" : ""
      }`}
    >
      <div className="flex gap-1 items-center w-full max-w-[600px]">
        <NavLinkComponent
          to="/"
          label="Home"
          icon={<img src={WindowsLogoIcon} alt="Home" className="w-6 h-6" />}
          truncate={false}
          className="home-menu-item"
        />
        <NavLinkComponent
          to="/addclimb"
          label="Add Climb"
          icon={<img src={NewFolderIcon} alt="Add Climb" className="w-6 h-6" />}
          truncate={true}
        />
        <NavLinkComponent
          to="/activity"
          label="Activity"
          icon={
            <img src={DocumentsFolderIcon} alt="Activity" className="w-6 h-6" />
          }
          truncate={true}
        />
        <NavLinkComponent
          to="/settings"
          label="Settings"
          icon={<img src={SettingsIcon} alt="Settings" className="w-6 h-6" />}
          truncate={true}
        />
      </div>
    </div>
  );
}
