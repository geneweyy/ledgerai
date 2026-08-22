import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import type { Language } from "../types";
import { LogoMark } from "../components/Logo";

const LANGS: { code: Language; label: string }[] = [
  { code: "bm", label: "Bahasa Malaysia" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文 Mandarin" },
  { code: "ta", label: "தமிழ் Tamil" },
];

export const Onboarding: React.FC = () => {
  const { completeOnboarding } = useStore();
  const [selected, setSelected] = useState<Language>("en");
  const navigate = useNavigate();

  const handleStart = () => {
    completeOnboarding(selected);
    navigate("/", { replace: true });
  };

  return (
    <div className="page center-col" style={{ justifyContent: "center", flex: 1 }}>
      <LogoMark size={64} />
      <div>
        <div className="wordmark" style={{ fontSize: 28 }}>
          Ledger<span className="ai">AI</span>
        </div>
        <p className="muted" style={{ marginTop: 6 }}>{t(selected, "tagline")}</p>
      </div>

      <div style={{ width: "100%", textAlign: "left", marginTop: 20 }}>
        <p className="section-title" style={{ marginBottom: 10 }}>{t(selected, "chooseLanguage")}</p>
        <div className="lang-grid">
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={"lang-btn" + (selected === l.code ? " selected" : "")}
              onClick={() => setSelected(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn-primary btn-block" style={{ marginTop: 24 }} onClick={handleStart}>
        {t(selected, "getStarted")}
      </button>
    </div>
  );
};
