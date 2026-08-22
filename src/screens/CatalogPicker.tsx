import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { formatRM, validateQuantity } from "../utils";
import { TopBar } from "../components/TopBar";
import { LimitModal } from "../components/LimitModal";
import { useToast } from "../components/Toast";
import type { CatalogItem } from "../types";

export const CatalogPicker: React.FC = () => {
  const { state, addEntry, canAddEntry } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [showLimitModal, setShowLimitModal] = useState(!canAddEntry());
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [qty, setQty] = useState(1);
  const [qtyInput, setQtyInput] = useState("1");
  const [qtyError, setQtyError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (showLimitModal) {
    return (
      <div className="screen">
        <TopBar title={t(lang, "tapSavedItem")} />
        <LimitModal onClose={() => navigate(-1)} />
      </div>
    );
  }

  const openPicker = (item: CatalogItem) => {
    setSelected(item);
    setQty(1);
    setQtyInput("1");
    setQtyError(null);
  };

  const adjustQty = (delta: number) => {
    setQty((q) => {
      const next = Math.max(1, q + delta);
      setQtyInput(String(next));
      setQtyError(null);
      return next;
    });
  };

  const handleQtyInputChange = (raw: string) => {
    setQtyInput(raw);
    const res = validateQuantity(raw);
    if (!res.ok) {
      setQtyError(t(lang, "invalidQuantity"));
    } else {
      setQtyError(null);
      setQty(res.value);
    }
  };

  const confirm = () => {
    if (!selected || submitting) return;
    const res = validateQuantity(qtyInput);
    if (!res.ok) {
      setQtyError(t(lang, "invalidQuantity"));
      return;
    }
    if (!canAddEntry()) {
      setShowLimitModal(true);
      return;
    }
    setSubmitting(true);
    const amount = Math.round(selected.price * res.value * 100) / 100;
    const result = addEntry({
      type: "income",
      amount,
      quantity: res.value,
      unitPrice: selected.price,
      category: selected.category,
      note: selected.name,
      method: "catalog",
      catalogItemId: selected.id,
    });
    if (result.ok) {
      showToast("Saved");
      navigate("/", { replace: true });
    } else {
      setSubmitting(false);
      setShowLimitModal(true);
    }
  };

  if (selected) {
    const total = selected.price * qty;
    return (
      <div className="screen">
        <TopBar title={selected.name} onBack={() => setSelected(null)} />
        <div className="page">
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{selected.name}</div>
            <div className="muted">{formatRM(selected.price)} / unit</div>
          </div>

          <p className="section-title" style={{ textAlign: "center" }}>{t(lang, "quantity")}</p>
          <div className="stepper">
            <button onClick={() => adjustQty(-1)} disabled={qty <= 1} aria-label="decrease">
              −
            </button>
            <span className="qty-value">{qty}</span>
            <button onClick={() => adjustQty(1)} aria-label="increase">
              +
            </button>
          </div>

          <div className="field" style={{ maxWidth: 160, margin: "0 auto" }}>
            <input
              type="number"
              min={1}
              step={1}
              value={qtyInput}
              onChange={(e) => handleQtyInputChange(e.target.value)}
              style={{ textAlign: "center" }}
            />
            {qtyError && <span className="field-error" style={{ textAlign: "center" }}>{qtyError}</span>}
          </div>

          <div className="card" style={{ textAlign: "center", fontWeight: 700 }}>
            {qty} × {formatRM(selected.price)} = {formatRM(total)}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setSelected(null)} disabled={submitting}>
              {t(lang, "cancel")}
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={confirm} disabled={submitting || !!qtyError}>
              {t(lang, "confirm")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <TopBar title={t(lang, "tapSavedItem")} onBack={() => navigate(-1)} />
      <div className="page">
        {state.catalogItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p style={{ margin: 0 }}>{t(lang, "noCatalogItems")}</p>
            <button className="btn btn-primary" onClick={() => navigate("/catalog")}>
              {t(lang, "addCatalogItem")}
            </button>
          </div>
        ) : (
          <div className="catalog-grid">
            {state.catalogItems.map((item) => (
              <button key={item.id} className="catalog-btn" onClick={() => openPicker(item)}>
                <span className="name">{item.name}</span>
                <span className="price">{formatRM(item.price)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
