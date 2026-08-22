import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { TopBar } from "../components/TopBar";
import { EntryForm } from "../components/EntryForm";
import { LimitModal } from "../components/LimitModal";
import { useToast } from "../components/Toast";
import { mockReceipts, pickRandom, shouldSimulateFailure, type MockReceiptResult } from "../mockAi";
import { IconCamera, IconFlask, IconSad } from "../components/Icons";

type Step = "capture" | "processing" | "failed" | "confirm";

export const PhotoFlow: React.FC = () => {
  const { state, addEntry, canAddEntry } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [showLimitModal, setShowLimitModal] = useState(!canAddEntry());
  const [step, setStep] = useState<Step>("capture");
  const [result, setResult] = useState<MockReceiptResult | null>(null);
  const [busy, setBusy] = useState(false);

  const startCapture = () => {
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
        setResult(pickRandom(mockReceipts));
        setStep("confirm");
      }
    }, 1400);
  };

  if (showLimitModal) {
    return (
      <div className="screen">
        <TopBar title={t(lang, "photographReceipt")} />
        <LimitModal onClose={() => navigate(-1)} />
      </div>
    );
  }

  return (
    <div className="screen">
      <TopBar title={t(lang, "photographReceipt")} onBack={() => navigate(-1)} />
      <div className="page">
        {step === "capture" && (
          <>
            <div className="viewfinder">
              <IconCamera size={28} />
              <span>Point camera at receipt</span>
            </div>
            <span className="simulated-badge"><IconFlask size={13} /> {t(lang, "simulatedLabel")}</span>
            <button className="btn btn-primary btn-block" onClick={startCapture}>
              {t(lang, "capture")}
            </button>
            <button className="link-btn" onClick={() => navigate("/log/manual")}>
              {t(lang, "enterManually")}
            </button>
          </>
        )}

        {step === "processing" && (
          <div className="center-col" style={{ flex: 1 }}>
            <div className="spinner" />
            <p style={{ fontWeight: 700 }}>{t(lang, "readingReceipt")}</p>
            <span className="simulated-badge"><IconFlask size={13} /> {t(lang, "simulatedLabel")}</span>
          </div>
        )}

        {step === "failed" && (
          <div className="center-col" style={{ flex: 1 }}>
            <div className="empty-icon"><IconSad size={26} /></div>
            <p style={{ fontWeight: 700, margin: 0 }}>{t(lang, "couldntReadClearly")}</p>
            <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 10 }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep("capture")}>
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
              type: "expense",
              amount: result.amount.toFixed(2),
              category: result.category,
              note: result.vendor,
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
                method: "photo",
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
