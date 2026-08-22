import React from "react";
import { useStore } from "../store";
import { t } from "../i18n";

interface Props {
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<Props> = ({ title, message, confirmLabel, danger, onConfirm, onCancel }) => {
  const { state } = useStore();
  const lang = state.language;
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ margin: 0, fontSize: "var(--text-lg)" }}>{title}</h2>
        <p className="muted" style={{ margin: 0 }}>{message}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onCancel}>
            {t(lang, "cancel")}
          </button>
          <button
            className={danger ? "btn btn-danger" : "btn btn-primary"}
            style={{ flex: 1 }}
            onClick={onConfirm}
          >
            {confirmLabel ?? t(lang, "confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};
