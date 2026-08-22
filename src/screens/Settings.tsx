import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t, dictionaries } from "../i18n";
import { TIER_LIMITS, TIER_AI_LABEL } from "../types";
import type { Tier, Language } from "../types";
import { formatRM } from "../utils";
import { TopBar } from "../components/TopBar";
import { TabBar } from "../components/TabBar";
import { ConfirmModal } from "../components/ConfirmModal";
import { useToast } from "../components/Toast";
import { IconUser, IconLogOut, IconSun, IconMoon, IconSettings } from "../components/Icons";
import type { ThemeMode } from "../types";

const TIERS: Tier[] = ["free", "solo", "business", "pro"];
const LANGS: { code: Language; label: string }[] = [
  { code: "bm", label: "Bahasa Malaysia" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ta", label: "தமிழ்" },
];
const THEME_MODES: ThemeMode[] = ["light", "dark", "system"];

export const Settings: React.FC = () => {
  const { state, setTier, setTurnover, setLanguage, resetDemoData, setThemeMode, logout } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [turnoverInput, setTurnoverInput] = useState(String(state.turnover));
  const [turnoverError, setTurnoverError] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const commitTurnover = () => {
    const n = Number(turnoverInput);
    if (turnoverInput.trim() === "" || Number.isNaN(n) || n < 0) {
      setTurnoverError(t(lang, "invalidAmount"));
      return;
    }
    setTurnoverError(null);
    setTurnover(Math.round(n * 100) / 100);
    showToast("Saved");
  };

  return (
    <div className="screen">
      <TopBar title={t(lang, "settings")} onBack={() => navigate(-1)} />
      <div className="page">
        <div className="card" style={{ padding: "2px 14px" }}>
          <button className="settings-row" onClick={() => navigate("/profile")}>
            <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="settings-row-icon"><IconUser size={17} /></span>
              {t(lang, "profile")}
            </span>
            <span className="muted">{state.profile.businessName || "—"}</span>
          </button>
        </div>

        <div>
          <p className="section-title">{t(lang, "theme")}</p>
          <div className="theme-toggle" style={{ marginTop: 8 }}>
            {THEME_MODES.map((mode) => (
              <button
                key={mode}
                className={state.themeMode === mode ? "active" : ""}
                onClick={() => setThemeMode(mode)}
              >
                {mode === "light" && <IconSun size={15} />}
                {mode === "dark" && <IconMoon size={15} />}
                {mode === "system" && <IconSettings size={15} />}
                {mode === "light" ? t(lang, "themeLight") : mode === "dark" ? t(lang, "themeDark") : t(lang, "themeSystem")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="section-title">{t(lang, "tier")}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {TIERS.map((tierOption) => (
              <button
                key={tierOption}
                className={"tier-option" + (state.tier === tierOption ? " selected" : "")}
                onClick={() => setTier(tierOption)}
              >
                <div className="tier-name-row">
                  <strong style={{ textTransform: "capitalize" }}>{tierOption}</strong>
                  {tierOption === "business" && <span className="badge">{t(lang, "recommended")}</span>}
                </div>
                <span className="muted">
                  {TIER_LIMITS[tierOption] === Infinity ? "Unlimited" : TIER_LIMITS[tierOption]} entries/day ·{" "}
                  {t(lang, "aiModel")}: {TIER_AI_LABEL[tierOption]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="turnover">{t(lang, "turnover")}</label>
          <input
            id="turnover"
            inputMode="decimal"
            value={turnoverInput}
            onChange={(e) => setTurnoverInput(e.target.value)}
            onBlur={commitTurnover}
          />
          {turnoverError && <span className="field-error">{turnoverError}</span>}
          <span className="muted">Current: {formatRM(state.turnover)}</span>
        </div>

        <div>
          <p className="section-title">{t(lang, "language")}</p>
          <div className="lang-grid" style={{ marginTop: 8 }}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={"lang-btn" + (state.language === l.code ? " selected" : "")}
                onClick={() => setLanguage(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divider" />

        <button className="btn btn-danger btn-block" onClick={() => setConfirmReset(true)}>
          {t(lang, "resetDemoData")}
        </button>

        <button
          className="btn btn-secondary btn-block"
          onClick={() => {
            logout();
            navigate("/", { replace: true });
          }}
        >
          <IconLogOut size={17} /> {t(lang, "logOut")}
        </button>

        <p className="muted" style={{ textAlign: "center" }}>
          {dictionaries[lang].appName} — {t(lang, "aiModel")}: {TIER_AI_LABEL[state.tier]}
        </p>
      </div>
      <TabBar />

      {confirmReset && (
        <ConfirmModal
          title={t(lang, "resetDemoData")}
          message={t(lang, "resetConfirm")}
          confirmLabel={t(lang, "confirm")}
          danger
          onCancel={() => setConfirmReset(false)}
          onConfirm={() => {
            resetDemoData();
            setConfirmReset(false);
            setTurnoverInput("0");
            showToast("Reset complete");
            navigate("/", { replace: true });
          }}
        />
      )}
    </div>
  );
};
