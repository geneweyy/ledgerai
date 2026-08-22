import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { TopBar } from "../components/TopBar";
import { EntryForm } from "../components/EntryForm";
import { LimitModal } from "../components/LimitModal";
import { useToast } from "../components/Toast";
import {
  mockVoicePhrasesBM,
  mockVoicePhrasesEN,
  mockVoicePhrasesZH,
  mockVoicePhrasesTA,
  pickRandom,
  shouldSimulateFailure,
  type MockVoiceResult,
} from "../mockAi";
import { IconMic, IconFlask, IconSad } from "../components/Icons";
import type { Language } from "../types";

type Step = "listen" | "processing" | "failed" | "confirm";

const VOICE_LANGS: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "bm", label: "Bahasa Malaysia" },
  { code: "zh", label: "中文" },
  { code: "ta", label: "தமிழ்" },
];

const VOICE_PHRASE_POOLS: Record<Language, MockVoiceResult[]> = {
  en: mockVoicePhrasesEN,
  bm: mockVoicePhrasesBM,
  zh: mockVoicePhrasesZH,
  ta: mockVoicePhrasesTA,
};

export const VoiceFlow: React.FC = () => {
  const { state, addEntry, canAddEntry } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [showLimitModal, setShowLimitModal] = useState(!canAddEntry());
  const [step, setStep] = useState<Step>("listen");
  const [voiceLang, setVoiceLang] = useState<Language>(lang);
  const [result, setResult] = useState<MockVoiceResult | null>(null);
  const [busy, setBusy] = useState(false);

  const startListening = () => {
    if (!canAddEntry()) {
      setShowLimitModal(true);
      return;
    }
    if (busy) return;
    setBusy(true);
    setStep("processing");
    window.setTimeout(() => {
      setBusy(false);
      if (shouldSimulateFailure()) {
        setStep("failed");
      } else {
        const pool = VOICE_PHRASE_POOLS[voiceLang];
        setResult(pickRandom(pool));
        setStep("confirm");
      }
    }, 1400);
  };

  if (showLimitModal) {
    return (
      <div className="screen">
        <TopBar title={t(lang, "speakTransaction")} />
        <LimitModal onClose={() => navigate(-1)} />
      </div>
    );
  }

  return (
    <div className="screen">
      <TopBar title={t(lang, "speakTransaction")} onBack={() => navigate(-1)} />
      <div className="page">
        {step === "listen" && (
          <>
            <div className="lang-grid">
              {VOICE_LANGS.map((l) => (
                <button
                  key={l.code}
                  className={"lang-btn" + (voiceLang === l.code ? " selected" : "")}
                  onClick={() => setVoiceLang(l.code)}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="center-col">
              <div className="mic-orb"><IconMic size={32} /></div>
              <p className="muted">Tap the mic and describe your sale or expense.</p>
            </div>
            <span className="simulated-badge"><IconFlask size={13} /> {t(lang, "simulatedLabel")}</span>
            <button className="btn btn-primary btn-block" onClick={startListening}>
              {t(lang, "capture")}
            </button>
            <button className="link-btn" onClick={() => navigate("/log/manual")}>
              {t(lang, "enterManually")}
            </button>
          </>
        )}

        {step === "processing" && (
          <div className="center-col" style={{ flex: 1 }}>
            <div className="mic-orb listening"><IconMic size={32} /></div>
            <p style={{ fontWeight: 700 }}>{t(lang, "listening")}</p>
            <div className="spinner" />
            <p style={{ fontWeight: 700 }}>{t(lang, "processing")}</p>
            <span className="simulated-badge"><IconFlask size={13} /> {t(lang, "simulatedLabel")}</span>
          </div>
        )}

        {step === "failed" && (
          <div className="center-col" style={{ flex: 1 }}>
            <div className="empty-icon"><IconSad size={26} /></div>
            <p style={{ fontWeight: 700, margin: 0 }}>{t(lang, "didntCatchThat")}</p>
            <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 10 }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep("listen")}>
                {t(lang, "tryAgain")}
              </button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate("/log/manual")}>
                {t(lang, "enterManually")}
              </button>
            </div>
            <button className="link-btn" onClick={() => navigate("/")}>{t(lang, "cancel")}</button>
          </div>
        )}

        {step === "confirm" && result && (
          <EntryForm
            initial={{
              type: result.type,
              amount: result.amount.toFixed(2),
              category: result.category,
              note: result.note,
            }}
            submitLabel={t(lang, "confirm")}
            onCancel={() => navigate("/")}
            extraTopContent={
              <span className="simulated-badge" style={{ marginBottom: 4 }}>
                <IconFlask size={13} /> {t(lang, "simulatedLabel")}
              </span>
            }
            onSubmit={(v) => {
              if (!canAddEntry()) {
                setShowLimitModal(true);
                return;
              }
              const res = addEntry({
                type: v.type,
                amount: v.amount,
                quantity: 1,
                unitPrice: null,
                category: v.category,
                note: v.note,
                method: "voice",
                catalogItemId: null,
              });
              if (res.ok) {
                showToast("Saved");
                navigate("/", { replace: true });
              } else {
                setShowLimitModal(true);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
