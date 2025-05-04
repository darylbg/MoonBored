import React from "react";

interface ActionButtonComponentProps {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export default function ActionButtonComponent({
  label,
  onClick,
  icon,
  className,
  isDisabled,
  isLoading,
}: ActionButtonComponentProps) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 ${className}`} disabled={isDisabled} >
      {isLoading ? <i className="hn hn-spinner-solid"></i> : icon}
      {icon}
      {label}
    </button>
  );
};