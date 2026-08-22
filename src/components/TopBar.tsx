import React from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronBack } from "./Icons";

export const TopBar: React.FC<{ title: string; onBack?: () => void; right?: React.ReactNode }> = ({
  title,
  onBack,
  right,
}) => {
  const navigate = useNavigate();
  return (
    <div className="top-bar">
      <button
        className="icon-btn"
        onClick={onBack ?? (() => navigate(-1))}
        aria-label="Back"
        style={{ visibility: onBack === undefined && window.history.length <= 1 ? "hidden" : "visible" }}
      >
        <IconChevronBack size={22} />
      </button>
      <h1>{title}</h1>
      <div className="top-bar-side">{right}</div>
    </div>
  );
};
