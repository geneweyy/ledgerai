import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { TopBar } from "../components/TopBar";
import { EntryForm } from "../components/EntryForm";
import { LimitModal } from "../components/LimitModal";
import { useToast } from "../components/Toast";

export const ManualEntry: React.FC = () => {
  const { state, addEntry, canAddEntry } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showLimitModal, setShowLimitModal] = useState(!canAddEntry());

  return (
    <div className="screen">
      <TopBar title={t(lang, "manual")} />
      {showLimitModal ? (
        <LimitModal onClose={() => navigate(-1)} />
      ) : (
        <EntryForm
          initial={{ type: "expense", amount: "", category: "Food", note: "" }}
          submitLabel={t(lang, "save")}
          onCancel={() => navigate(-1)}
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
              method: "manual",
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
  );
};
