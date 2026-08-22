import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { formatRM } from "../utils";
import { TopBar } from "../components/TopBar";
import { TabBar } from "../components/TabBar";
import { useToast } from "../components/Toast";

export const Tax: React.FC = () => {
  const { state, eInvoiceUnlocked } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);

  const yearTotals = useMemo(() => {
    const now = new Date();
    let income = 0;
    let expense = 0;
    for (const e of state.entries) {
      const d = new Date(e.createdAt);
      if (d.getFullYear() === now.getFullYear()) {
        if (e.type === "income") income += e.amount;
        else expense += e.amount;
      }
    }
    return { income, expense, net: income - expense };
  }, [state.entries]);

  const handleShare = () => {
    if (sharing) return;
    setSharing(true);
    window.setTimeout(() => {
      setSharing(false);
      setShared(true);
      showToast("Shared to WhatsApp (simulated)");
    }, 900);
  };

  return (
    <div className="screen">
      <TopBar title={t(lang, "taxCompliance")} onBack={() => navigate(-1)} />
      <div className="page">
        <div className="card">
          <p className="section-title" style={{ marginTop: 0 }}>{t(lang, "lhdnIncomeTax")}</p>
          <p className="muted">
            Every business in Malaysia files an annual income-tax return with LHDN, regardless of size. This
            report summarizes your estimated year-to-date figures to help with that filing.
          </p>
          <div className="divider" />
          <div className="muted">Year-to-date {t(lang, "income")}: <strong>{formatRM(yearTotals.income)}</strong></div>
          <div className="muted">Year-to-date {t(lang, "expense")}: <strong>{formatRM(yearTotals.expense)}</strong></div>
          <div className="muted">Estimated chargeable {t(lang, "net")}: <strong>{formatRM(yearTotals.net)}</strong></div>
        </div>

        <div className="card">
          <p className="section-title" style={{ marginTop: 0 }}>{t(lang, "sstReporting")}</p>
          <p className="muted">
            SST registration status: <strong>Not registered</strong>. Based on your current turnover, SST
            registration is not indicated as required. This is a simplified demo placeholder, not a tax filing.
          </p>
        </div>

        <div className={"tax-status-box" + (eInvoiceUnlocked ? " positive" : "")}>
          <p className="section-title" style={{ marginTop: 0 }}>{t(lang, "myInvois")}</p>

          {state.tier !== "pro" && (
            <>
              <p className="muted">
                MyInvois e-Invoicing tools are available on the Pro plan. Upgrade to unlock this feature when your
                business needs it.
              </p>
              <button className="btn btn-primary btn-block" onClick={() => navigate("/settings")}>
                {t(lang, "upgrade")}
              </button>
            </>
          )}

          {state.tier === "pro" && !eInvoiceUnlocked && (
            <p className="muted">
              Not required yet — LHDN exempts businesses under RM1,000,000 turnover. This will be here when you
              need it. Your current turnover on file: {formatRM(state.turnover)}.
            </p>
          )}

          {state.tier === "pro" && eInvoiceUnlocked && (
            <>
              <p className="muted">
                Your turnover ({formatRM(state.turnover)}) is above the RM1,000,000 threshold, so MyInvois
                e-Invoicing tools are available.
              </p>
              {!invoiceGenerated ? (
                <button className="btn btn-primary btn-block" onClick={() => setInvoiceGenerated(true)}>
                  {t(lang, "generateInvoice")}
                </button>
              ) : (
                <>
                  <div className="card" style={{ background: "var(--bg)" }}>
                    <div style={{ fontWeight: 700 }}>e-Invoice #INV-{new Date().getFullYear()}-{String(state.entries.length).padStart(4, "0")}</div>
                    <div className="muted">Generated {new Date().toLocaleDateString()} (simulated)</div>
                  </div>
                  <button className="btn btn-secondary btn-block" onClick={handleShare} disabled={sharing}>
                    {sharing ? "…" : shared ? "✓ Shared" : `📲 ${t(lang, "shareWhatsapp")}`}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <TabBar />
    </div>
  );
};
