import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

interface NavLinkComponentProps {
  label: string;
  to: string;
  icon: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  collapseToIcon?: boolean;
  truncate?: boolean;
}

export default function NavLinkComponent({
  label,
  to,
  icon,
  className,
  isActive,
  isDisabled,
  collapseToIcon,
  truncate,
}: NavLinkComponentProps) {
  const { win95Mode } = useGlobalContext();

  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center flex-grow gap-1 ${
          win95Mode ? "win95-border-1 win95-button-1" : ""
        } py-[3px] px-[5px] ${
          isActive ? win95Mode ? "win95-active-nav-link" : "active-nav-link" : ""
        } ${className || ''}`
      }
    >
      {icon}
      <span
        className={`text-nowrap ${
          truncate ? "overflow-hidden text-ellipsis truncate" : ""
        }`}
      >
        {label}
      </span>
    </NavLink>
  );
}
