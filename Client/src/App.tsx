import { useState, ReactNode } from "react";
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
import { GlobalProvider } from "./context/GlobalContext";
import "./App.css";

// Type for layout children
interface LayoutProps {
  children: ReactNode;
}

function MainLayout({ children } : LayoutProps) {
  return (
    <>
      <MainTopBar />
        <div className="flex flex-col flex-1 overflow-y-auto ">
          {children}
        </div>
      <MainMenu />
    </>
  );
}

function ClimbLayout({ children } : LayoutProps) {
  return (
    <>
      <ClimbTopBar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        {children}
      </div>
    </>
  );
}

function AddClimbLayout({ children } : LayoutProps) {
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {children}
      </div>
      <AddClimbMenu />
    </>
  );
}

export default function App() {
 
  return (
    <GlobalProvider>
    <HashRouter>
    
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>}/>// prettier-ignore
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout> } /> // prettier-ignore
        <Route path="/activity" element={<MainLayout><Activity /></MainLayout>} />// prettier-ignore
        <Route path="/moonboard" element={<MainLayout><Moonboard /></MainLayout>} />// prettier-ignore
        <Route path="/climb" element={<ClimbLayout><Climb /></ClimbLayout>} />// prettier-ignore
        <Route path="/addclimb" element={<AddClimbLayout><AddClimb /></AddClimbLayout>} />// prettier-ignore
      </Routes>
    
  </HashRouter>
  </GlobalProvider>
  );
}
