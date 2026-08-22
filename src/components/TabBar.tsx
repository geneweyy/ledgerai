import React from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";

export const TabBar: React.FC = () => {
  const { state } = useStore();
  const lang = state.language;

  const tabs = [
    { to: "/", label: t(lang, "home"), icon: "🏠" },
    { to: "/catalog", label: t(lang, "catalog"), icon: "📋" },
    { to: "/reports", label: t(lang, "reports"), icon: "📊" },
    { to: "/tax", label: t(lang, "taxCompliance"), icon: "🧾" },
    { to: "/settings", label: t(lang, "settings"), icon: "⚙️" },
  ];

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === "/"}
          className={({ isActive }) => "tab-item" + (isActive ? " active" : "")}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
