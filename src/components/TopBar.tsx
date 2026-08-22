import React from "react";
import { useNavigate } from "react-router-dom";

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
        ‹
      </button>
      <h1>{title}</h1>
      <div style={{ minWidth: 40, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
};
