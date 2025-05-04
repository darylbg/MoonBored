import { ReactNode, useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddClimb from "./pages/AddClimb";
import Moonboard from "./pages/Moonboard";
import Activity from "./pages/Activity";
import MainTopBar from "./components/MainTopBar";
import MainMenu from "./components/MainMenu";
import ClimbTopBar from "./components/ClimbTopBar";
import AddClimbMenu from "./components/AddClimbMenu";
import Settings from "./pages/Settings";
import Climb from "./pages/Climb";
import { GlobalProvider, useGlobalContext } from "./context/GlobalContext";
import WindowsLogoIcon from "./assets/icons/win95_icons/Windows logo (without text).ico";
import "./App.css";

// Type for layout children
interface LayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  const { win95Mode } = useGlobalContext();

  const [urlPath, setUrlPath] = useState<string>("/home");
  console.log(window.location.href, urlPath);

  useEffect(() => {
    const path = window.location.href.split("#")[1];
    if (path === "/") {
      setUrlPath("/home");
    } else {
      setUrlPath(path);
    }
  }, [window.location.href]);

  return (
    <>
      {/* <MainTopBar /> */}
      <div
        className={`flex flex-col flex-1 overflow-y-auto p-1 win95:bg-win95-grey ${
          win95Mode ? "win95-border-1" : ""
        }`}
      >
        <MainTopBar
          icon={<img src={WindowsLogoIcon} alt="Windows Logo" className="" />}
          title={urlPath}
        />
        <div
          className={`flex flex-col flex-1 overflow-y-auto mt-1 py-[1px] pl-[1px] pr-[0px] ${
            win95Mode ? "win95-border-2" : ""
          }`}
        >
          {children}
        </div>
      </div>
      <MainMenu />
    </>
  );
}

function ClimbLayout({ children }: LayoutProps) {
  return (
    <>
      <ClimbTopBar />
      <div className="flex flex-col flex-1 overflow-y-auto">{children}</div>
    </>
  );
}

function AddClimbLayout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto">{children}</div>
      <AddClimbMenu />
    </>
  );
}

export default function App() {
  return (
    <GlobalProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          // prettier-ignore
          <Route
            path="/settings"
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            }
          />{" "}
          // prettier-ignore
          <Route
            path="/activity"
            element={
              <MainLayout>
                <Activity />
              </MainLayout>
            }
          />
          // prettier-ignore
          <Route
            path="/moonboard"
            element={
              <MainLayout>
                <Moonboard />
              </MainLayout>
            }
          />
          // prettier-ignore
          <Route
            path="/climb"
            element={
              <ClimbLayout>
                <Climb />
              </ClimbLayout>
            }
          />
          // prettier-ignore
          <Route
            path="/addclimb"
            element={
              <AddClimbLayout>
                <AddClimb />
              </AddClimbLayout>
            }
          />
          // prettier-ignore
        </Routes>
      </HashRouter>
    </GlobalProvider>
  );
}
