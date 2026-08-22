import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { formatRM, isSameLocalDay, startOfMonth, startOfWeek } from "../utils";
import { TopBar } from "../components/TopBar";
import { TabBar } from "../components/TabBar";
import { IconChart } from "../components/Icons";

type Range = "today" | "week" | "month";

export const Reports: React.FC = () => {
  const { state } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const [range, setRange] = useState<Range>("week");

  const now = new Date();

  const filtered = useMemo(() => {
    if (range === "today") {
      return state.entries.filter((e) => isSameLocalDay(e.createdAt, now));
    }
    if (range === "week") {
      const start = startOfWeek(now);
      return state.entries.filter((e) => new Date(e.createdAt) >= start);
    }
    const start = startOfMonth(now);
    return state.entries.filter((e) => new Date(e.createdAt) >= start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, state.entries]);

  const { income, expense, net } = useMemo(() => {
    let income = 0;
    let expense = 0;
    for (const e of filtered) {
      if (e.type === "income") income += e.amount;
      else expense += e.amount;
    }
    return { income, expense, net: income - expense };
  }, [filtered]);

  // group by day for chart
  const dayBuckets = useMemo(() => {
    const map = new Map<string, { income: number; expense: number; label: string }>();
    for (const e of filtered) {
      const d = new Date(e.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      const label = d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
      if (!map.has(key)) map.set(key, { income: 0, expense: 0, label });
      const bucket = map.get(key)!;
      if (e.type === "income") bucket.income += e.amount;
      else bucket.expense += e.amount;
    }
    return Array.from(map.entries())
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([, v]) => v);
  }, [filtered]);

  const maxVal = Math.max(1, ...dayBuckets.flatMap((b) => [b.income, b.expense]));

  return (
    <div className="screen">
      <TopBar title={t(lang, "reports")} onBack={() => navigate(-1)} />
      <div className="page">
        <div className="pill-toggle">
          <button className={range === "today" ? "active" : ""} onClick={() => setRange("today")}>
            {t(lang, "today")}
          </button>
          <button className={range === "week" ? "active" : ""} onClick={() => setRange("week")}>
            {t(lang, "thisWeek")}
          </button>
          <button className={range === "month" ? "active" : ""} onClick={() => setRange("month")}>
            {t(lang, "thisMonth")}
          </button>
        </div>

        <div className="stat-grid">
          <div className="stat-box">
            <div className="stat-label">{t(lang, "income")}</div>
            <div className="stat-value amount-income">{formatRM(income)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">{t(lang, "expense")}</div>
            <div className="stat-value amount-expense">{formatRM(expense)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">{t(lang, "net")}</div>
            <div className="stat-value">{formatRM(net)}</div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><IconChart size={26} /></div>
            <p style={{ margin: 0 }}>{t(lang, "noEntriesInPeriod")}</p>
          </div>
        ) : (
          <div className="card chart-card">
            <p className="section-title" style={{ marginTop: 0 }}>{t(lang, "income")} vs {t(lang, "expense")}</p>
            <div className="chart-legend">
              <span className="chart-legend-item">
                <span className="chart-legend-dot income" />
                {t(lang, "income")}
              </span>
              <span className="chart-legend-item">
                <span className="chart-legend-dot expense" />
                {t(lang, "expense")}
              </span>
            </div>
            <div className="bar-chart">
              {dayBuckets.map((b, i) => (
                <div className="bar-col" key={i}>
                  <div className="bar-pair">
                    <div className="bar" style={{ height: `${(b.income / maxVal) * 100}%` }} />
                    <div className="bar expense" style={{ height: `${(b.expense / maxVal) * 100}%` }} />
                  </div>
                  <span className="bar-label">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="section-title">{t(lang, "recentEntries")}</p>
          <div className="card" style={{ padding: "4px 14px", marginTop: 8 }}>
            {filtered.length === 0 ? (
              <p className="muted" style={{ padding: "12px 0" }}>{t(lang, "noEntriesInPeriod")}</p>
            ) : (
              [...filtered]
                .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                .map((e) => (
                  <div key={e.id} className="entry-row">
                    <div className="entry-main">
                      <div className="entry-note">{e.note || e.category}</div>
                      <div className="entry-meta">
                        {new Date(e.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </div>
                    </div>
                    <div className={"entry-amount " + (e.type === "income" ? "amount-income" : "amount-expense")}>
                      {e.type === "income" ? "+" : "-"}
                      {formatRM(e.amount)}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <TabBar />
    </div>
  );
};
