import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { TIER_LIMITS } from "../types";
import { IconWarning } from "./Icons";

export const LimitModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { state } = useStore();
  const lang = state.language;
  const navigate = useNavigate();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <IconWarning size={26} />
        </div>
        <h2 style={{ margin: 0, fontSize: "var(--text-lg)", textAlign: "center" }}>{t(lang, "limitReached")}</h2>
        <p className="muted" style={{ margin: 0, textAlign: "center" }}>
          {`Your ${state.tier} plan allows ${TIER_LIMITS[state.tier]} entries per day. Upgrade for a higher daily limit.`}
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
            {t(lang, "cancel")}
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={() => {
              onClose();
              navigate("/settings");
            }}
          >
            {t(lang, "upgrade")}
          </button>
        </div>
      </div>
    </div>
  );
};
