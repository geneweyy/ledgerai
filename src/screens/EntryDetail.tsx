import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { TopBar } from "../components/TopBar";
import { EntryForm } from "../components/EntryForm";
import { ConfirmModal } from "../components/ConfirmModal";
import { useToast } from "../components/Toast";

export const EntryDetail: React.FC = () => {
  const { id } = useParams();
  const { state, updateEntry, deleteEntry } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const entry = state.entries.find((e) => e.id === id);

  if (!entry) {
    return (
      <div className="screen">
        <TopBar title={t(lang, "viewDetails")} />
        <div className="page">
          <div className="empty-state">
            <p>Entry not found.</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              {t(lang, "home")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="screen">
        <TopBar title={t(lang, "edit")} onBack={() => setEditing(false)} />
        <EntryForm
          initial={{ type: entry.type, amount: String(entry.amount), category: entry.category, note: entry.note }}
          submitLabel={t(lang, "save")}
          onCancel={() => setEditing(false)}
          onSubmit={(v) => {
            updateEntry(entry.id, { type: v.type, amount: v.amount, category: v.category, note: v.note });
            showToast("Saved");
            setEditing(false);
            navigate("/", { replace: true });
          }}
        />
      </div>
    );
  }

  return (
    <div className="screen">
      <TopBar title={t(lang, "viewDetails")} />
      <div className="page">
        <div className="card">
          <div style={{ fontSize: 13, color: "var(--grey)", fontWeight: 700, textTransform: "uppercase" }}>
            {t(lang, entry.type)}
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, marginTop: 4 }} className={entry.type === "income" ? "amount-income" : "amount-expense"}>
            {entry.type === "income" ? "+" : "-"}
            RM{entry.amount.toFixed(2)}
          </div>
          <div className="divider" />
          <div className="muted">{t(lang, "category")}: {entry.category}</div>
          {entry.note && <div className="muted">{t(lang, "note")}: {entry.note}</div>}
          {entry.quantity > 1 && entry.unitPrice != null && (
            <div className="muted">
              {entry.quantity} × RM{entry.unitPrice.toFixed(2)}
            </div>
          )}
          <div className="muted">{new Date(entry.createdAt).toLocaleString()}</div>
          <div className="muted">Method: {entry.method}</div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setEditing(true)}>
            {t(lang, "edit")}
          </button>
          <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => setConfirmDelete(true)}>
            {t(lang, "delete")}
          </button>
        </div>
      </div>

      {confirmDelete && (
        <ConfirmModal
          title={t(lang, "delete")}
          message={t(lang, "deleteConfirm")}
          confirmLabel={t(lang, "delete")}
          danger
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            deleteEntry(entry.id);
            showToast("Deleted");
            navigate("/", { replace: true });
          }}
        />
      )}
    </div>
  );
};
