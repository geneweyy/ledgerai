import React from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { IconHome, IconReceipt, IconChart, IconDocument, IconSettings } from "./Icons";

export const TabBar: React.FC = () => {
  const { state } = useStore();
  const lang = state.language;

  const tabs = [
    { to: "/", label: t(lang, "home"), Icon: IconHome },
    { to: "/catalog", label: t(lang, "catalog"), Icon: IconReceipt },
    { to: "/reports", label: t(lang, "reports"), Icon: IconChart },
    { to: "/tax", label: t(lang, "taxCompliance"), Icon: IconDocument },
    { to: "/settings", label: t(lang, "settings"), Icon: IconSettings },
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
          <span className="tab-icon">
            <tab.Icon size={20} />
          </span>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
