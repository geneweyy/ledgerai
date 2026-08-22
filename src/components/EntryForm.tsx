import React, { useState } from "react";
import { useStore } from "../store";
import { t } from "../i18n";
import type { EntryType } from "../types";
import { validateAmount } from "../utils";

export interface EntryFormValue {
  type: EntryType;
  amount: string;
  category: string;
  note: string;
}

interface Props {
  initial: EntryFormValue;
  submitLabel: string;
  onSubmit: (value: { type: EntryType; amount: number; category: string; note: string }) => void;
  onCancel: () => void;
  extraTopContent?: React.ReactNode;
}

const CATEGORY_OPTIONS = [
  "Food",
  "Beverage",
  "Snack",
  "Ingredients",
  "Rent",
  "Utilities",
  "Supplies",
  "Transport",
  "Other",
];

export const EntryForm: React.FC<Props> = ({ initial, submitLabel, onSubmit, onCancel, extraTopContent }) => {
  const { state } = useStore();
  const lang = state.language;
  const [type, setType] = useState<EntryType>(initial.type);
  const [amount, setAmount] = useState(initial.amount);
  const [category, setCategory] = useState(initial.category || "Food");
  const [note, setNote] = useState(initial.note);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const amtResult = validateAmount(amount);
    let hasError = false;
    if (!amtResult.ok) {
      setAmountError(t(lang, "invalidAmount"));
      hasError = true;
    } else {
      setAmountError(null);
    }
    if (!category.trim()) {
      setCategoryError(t(lang, "requiredField"));
      hasError = true;
    } else {
      setCategoryError(null);
    }
    if (hasError) return;

    setSubmitting(true);
    onSubmit({ type, amount: amtResult.value, category: category.trim(), note: note.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="page" style={{ paddingTop: 0 }}>
      {extraTopContent}
      <div className="pill-toggle">
        <button type="button" className={type === "income" ? "active" : ""} onClick={() => setType("income")}>
          {t(lang, "income")}
        </button>
        <button type="button" className={type === "expense" ? "active" : ""} onClick={() => setType("expense")}>
          {t(lang, "expense")}
        </button>
      </div>

      <div className="field">
        <label htmlFor="amount">{t(lang, "amount")} (RM)</label>
        <input
          id="amount"
          inputMode="decimal"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
        />
        {amountError && <span className="field-error">{amountError}</span>}
      </div>

      <div className="field">
        <label htmlFor="category">{t(lang, "category")}</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {categoryError && <span className="field-error">{categoryError}</span>}
      </div>

      <div className="field">
        <label htmlFor="note">{t(lang, "note")}</label>
        <input id="note" type="text" value={note} onChange={(e) => setNote(e.target.value)} maxLength={120} />
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onCancel} disabled={submitting}>
          {t(lang, "cancel")}
        </button>
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={submitting}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
};
