import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { formatRM, isSameLocalDay } from "../utils";
import { TopBar } from "../components/TopBar";
import { TabBar } from "../components/TabBar";
import { LimitModal } from "../components/LimitModal";
import { IconCamera, IconMic, IconReceipt, IconCheck, IconWarning, IconEmptyReceipt } from "../components/Icons";

function sparklinePoints(values: number[], width: number, height: number): string {
  if (values.length === 0) return "";
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 0);
  const range = max - min || 1;
  const step = values.length > 1 ? width / (values.length - 1) : 0;
  return values
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export const Home: React.FC = () => {
  const { state, todaysEntries, dailyLimit, limitReached, canAddEntry } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const [showLimitModal, setShowLimitModal] = useState(false);

  const { income, expense, net } = useMemo(() => {
    let income = 0;
    let expense = 0;
    for (const e of todaysEntries) {
      if (e.type === "income") income += e.amount;
      else expense += e.amount;
    }
    return { income, expense, net: income - expense };
  }, [todaysEntries]);

  // last 7 days net, oldest -> newest (today last)
  const last7 = useMemo(() => {
    const days: { net: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      let dayIncome = 0;
      let dayExpense = 0;
      for (const e of state.entries) {
        if (isSameLocalDay(e.createdAt, d)) {
          if (e.type === "income") dayIncome += e.amount;
          else dayExpense += e.amount;
        }
      }
      days.push({ net: dayIncome - dayExpense });
    }
    return days;
  }, [state.entries]);

  const trend = useMemo(() => {
    const priorDays = last7.slice(0, 6); // days before today
    const avg = priorDays.length ? priorDays.reduce((s, d) => s + d.net, 0) / priorDays.length : 0;
    const todayNet = last7[last7.length - 1]?.net ?? 0;
    if (avg === 0) return null;
    const pct = ((todayNet - avg) / Math.abs(avg)) * 100;
    return { pct, positive: pct >= 0 };
  }, [last7]);

  const sparkPts = sparklinePoints(
    last7.map((d) => d.net),
    100,
    28
  );

  const recent = useMemo(() => {
    return [...state.entries].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 15);
  }, [state.entries]);

  const guardedNav = (path: string) => {
    if (!canAddEntry()) {
      setShowLimitModal(true);
      return;
    }
    navigate(path);
  };

  return (
    <div className="screen">
      <TopBar title={t(lang, "home")} onBack={() => {}} />
      <div className="page">
        <div className="hero-card">
          <p className="hero-label">{t(lang, "didIMakeMoney")}</p>
          <div className={"hero-figure" + (net >= 0 ? " positive" : " negative")}>{formatRM(net)}</div>
          <div className="hero-stat-grid">
            <div className="hero-stat">
              <div className="hero-stat-label">{t(lang, "income")}</div>
              <div className="hero-stat-value">{formatRM(income)}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-label">{t(lang, "expense")}</div>
              <div className="hero-stat-value">{formatRM(expense)}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-label">{t(lang, "net")}</div>
              <div className="hero-stat-value">{formatRM(net)}</div>
            </div>
          </div>

          {trend && (
            <div className="trend-row">
              <span className={"trend-caption" + (trend.positive ? " positive" : " negative")}>
                {trend.positive ? "▲" : "▼"} {Math.abs(trend.pct).toFixed(0)}%{" "}
                {trend.positive ? t(lang, "aboveAvg") : t(lang, "belowAvg")}
              </span>
              <svg className="sparkline" width="100" height="28" viewBox="0 0 100 28">
                <polyline
                  points={sparkPts}
                  fill="none"
                  stroke={trend.positive ? "var(--mint2)" : "#ff9270"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        <div
          className={"badge" + (limitReached ? " badge-warning" : "")}
          style={{ alignSelf: "flex-start" }}
        >
          {limitReached ? <IconWarning size={13} /> : <IconCheck size={13} />}
          {todaysEntries.length} / {dailyLimit === Infinity ? "∞" : dailyLimit} {t(lang, "entriesUsed")}
          {limitReached ? ` — ${t(lang, "limitReached")}` : ""}
        </div>

        <div>
          <p className="section-title">{t(lang, "logTransaction")}</p>
          <div className="quick-actions" style={{ marginTop: 8 }}>
            <button className="quick-action-btn" onClick={() => guardedNav("/log/photo")}>
              <span className="quick-action-icon"><IconCamera size={20} /></span>
              {t(lang, "photographReceipt")}
            </button>
            <button className="quick-action-btn" onClick={() => guardedNav("/log/voice")}>
              <span className="quick-action-icon"><IconMic size={20} /></span>
              {t(lang, "speakTransaction")}
            </button>
            <button className="quick-action-btn" onClick={() => guardedNav("/catalog")}>
              <span className="quick-action-icon"><IconReceipt size={20} /></span>
              {t(lang, "tapSavedItem")}
            </button>
          </div>
        </div>

        <div>
          <p className="section-title">{t(lang, "recentEntries")}</p>
          <div className="card" style={{ marginTop: 8, padding: "4px 14px" }}>
            {recent.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><IconEmptyReceipt size={26} /></div>
                <p style={{ margin: 0 }}>{t(lang, "noEntriesToday")}</p>
              </div>
            ) : (
              recent.map((e) => (
                <button key={e.id} className="entry-row" onClick={() => navigate(`/entry/${e.id}`)}>
                  <div className="entry-main">
                    <div className="entry-note">{e.note || e.category}</div>
                    <div className="entry-meta">
                      {new Date(e.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      {" · "}
                      {new Date(e.createdAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                      {" · "}
                      {e.category}
                    </div>
                  </div>
                  <div className={"entry-amount " + (e.type === "income" ? "amount-income" : "amount-expense")}>
                    {e.type === "income" ? "+" : "-"}
                    {formatRM(e.amount)}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
      <TabBar />
      {showLimitModal && <LimitModal onClose={() => setShowLimitModal(false)} />}
    </div>
  );
};
