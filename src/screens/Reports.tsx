import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { formatRM, isSameLocalDay, startOfMonth } from "../utils";
import { TopBar } from "../components/TopBar";
import { TabBar } from "../components/TabBar";
import { IconChart, IconCamera, IconMic, IconChevronDown } from "../components/Icons";
import type { DictKey } from "../i18n";

type Range = "today" | "yesterday" | "last7" | "month" | "lastMonth" | "year";

const RANGE_KEYS: { key: Range; labelKey: DictKey }[] = [
  { key: "today", labelKey: "today" },
  { key: "yesterday", labelKey: "yesterday" },
  { key: "last7", labelKey: "last7Days" },
  { key: "month", labelKey: "thisMonth" },
  { key: "lastMonth", labelKey: "lastMonth" },
  { key: "year", labelKey: "thisYear" },
];

export const Reports: React.FC = () => {
  const { state } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const [range, setRange] = useState<Range>("last7");
  const [rangeOpen, setRangeOpen] = useState(false);
  const [selectedBucketIdx, setSelectedBucketIdx] = useState<number | null>(null);

  const now = new Date();

  const filtered = useMemo(() => {
    if (range === "today") {
      return state.entries.filter((e) => isSameLocalDay(e.createdAt, now));
    }
    if (range === "yesterday") {
      const y = new Date(now);
      y.setDate(y.getDate() - 1);
      return state.entries.filter((e) => isSameLocalDay(e.createdAt, y));
    }
    if (range === "last7") {
      const start = new Date(now);
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      return state.entries.filter((e) => new Date(e.createdAt) >= start);
    }
    if (range === "month") {
      const start = startOfMonth(now);
      return state.entries.filter((e) => new Date(e.createdAt) >= start);
    }
    if (range === "lastMonth") {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = startOfMonth(now);
      return state.entries.filter((e) => {
        const d = new Date(e.createdAt);
        return d >= start && d < end;
      });
    }
    // year
    return state.entries.filter((e) => new Date(e.createdAt).getFullYear() === now.getFullYear());
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
  const selectedBucket = selectedBucketIdx !== null ? dayBuckets[selectedBucketIdx] : null;

  const rangeLabel = RANGE_KEYS.find((r) => r.key === range)?.labelKey ?? "thisWeek";

  const selectRange = (r: Range) => {
    setRange(r);
    setRangeOpen(false);
    setSelectedBucketIdx(null);
  };

  return (
    <div className="screen">
      <TopBar title={t(lang, "reports")} onBack={() => navigate(-1)} />
      <div className="page">
        <div className="range-dropdown">
          <button
            className="range-dropdown-trigger"
            onClick={() => setRangeOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={rangeOpen}
            aria-label={t(lang, "selectPeriod")}
          >
            <span>{t(lang, rangeLabel)}</span>
            <IconChevronDown size={18} />
          </button>
          {rangeOpen && (
            <>
              <button
                className="range-dropdown-backdrop"
                aria-label={t(lang, "close")}
                onClick={() => setRangeOpen(false)}
              />
              <div className="range-dropdown-menu" role="listbox">
                {RANGE_KEYS.map((r) => (
                  <button
                    key={r.key}
                    role="option"
                    aria-selected={range === r.key}
                    className={"range-dropdown-item" + (range === r.key ? " active" : "")}
                    onClick={() => selectRange(r.key)}
                  >
                    {t(lang, r.labelKey)}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="hero-card">
          <p className="hero-label">{t(lang, "netProfit")}</p>
          <div className={"hero-figure" + (net >= 0 ? " positive" : " negative")}>{formatRM(net)}</div>
          <div className="hero-stat-grid cols-2">
            <div className="hero-stat">
              <div className="hero-stat-label">{t(lang, "income")}</div>
              <div className="hero-stat-value">{formatRM(income)}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-label">{t(lang, "expense")}</div>
              <div className="hero-stat-value">{formatRM(expense)}</div>
            </div>
          </div>
        </div>

        <div>
          <p className="section-title">{t(lang, "logNewTransaction")}</p>
          <div className="quick-actions-row" style={{ marginTop: 8 }}>
            <button className="quick-action-btn compact" onClick={() => navigate("/log/photo")}>
              <span className="quick-action-icon"><IconCamera size={18} /></span>
              {t(lang, "photographReceipt")}
            </button>
            <button className="quick-action-btn compact" onClick={() => navigate("/log/voice")}>
              <span className="quick-action-icon"><IconMic size={18} /></span>
              {t(lang, "speakTransaction")}
            </button>
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
            <div className="bar-chart-scroll">
              <div className="bar-chart">
                {dayBuckets.map((b, i) => (
                  <button
                    type="button"
                    className={"bar-col" + (selectedBucketIdx === i ? " selected" : "")}
                    key={i}
                    onClick={() => setSelectedBucketIdx((cur) => (cur === i ? null : i))}
                  >
                    <div className="bar-pair">
                      <div className="bar" style={{ height: `${(b.income / maxVal) * 100}%` }} />
                      <div className="bar expense" style={{ height: `${(b.expense / maxVal) * 100}%` }} />
                    </div>
                    <span className="bar-label">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedBucket && (
              <div className="stat-grid" style={{ marginTop: "var(--space-3)" }}>
                <div className="stat-box">
                  <div className="stat-label">{t(lang, "income")}</div>
                  <div className="stat-value amount-income">{formatRM(selectedBucket.income)}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-label">{t(lang, "expense")}</div>
                  <div className="stat-value amount-expense">{formatRM(selectedBucket.expense)}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-label">{t(lang, "net")}</div>
                  <div className="stat-value">{formatRM(selectedBucket.income - selectedBucket.expense)}</div>
                </div>
              </div>
            )}
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
