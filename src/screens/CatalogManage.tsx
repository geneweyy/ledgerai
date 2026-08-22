import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { formatRM, validateAmount, validateQuantity } from "../utils";
import { TopBar } from "../components/TopBar";
import { TabBar } from "../components/TabBar";
import { ConfirmModal } from "../components/ConfirmModal";
import { LimitModal } from "../components/LimitModal";
import { useToast } from "../components/Toast";
import type { CatalogItem } from "../types";
import { IconPlus, IconEdit, IconTrash, IconReceipt, IconMinus, IconCheck } from "../components/Icons";

const CATEGORY_OPTIONS = ["Food", "Beverage", "Snack", "Ingredients", "Other"];

interface FormState {
  name: string;
  price: string;
  category: string;
}

export const CatalogManage: React.FC = () => {
  const { state, addEntry, canAddEntry, addCatalogItem, updateCatalogItem, deleteCatalogItem } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Sell-flow state: which tile is expanded for sale
  const [activeSaleId, setActiveSaleId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [qtyError, setQtyError] = useState<string | null>(null);
  const [savedFlashId, setSavedFlashId] = useState<string | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);

  // Edit/add-item modal state
  const [editingItem, setEditingItem] = useState<CatalogItem | "new" | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", price: "", category: "Food" });
  const [nameError, setNameError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CatalogItem | null>(null);

  const openSale = (item: CatalogItem) => {
    if (!canAddEntry()) {
      setShowLimitModal(true);
      return;
    }
    setActiveSaleId(item.id);
    setQty(1);
    setNote("");
    setQtyError(null);
  };

  const closeSale = () => {
    setActiveSaleId(null);
    setQtyError(null);
  };

  const adjustQty = (delta: number) => {
    setQty((q) => Math.max(1, q + delta));
    setQtyError(null);
  };

  const confirmSale = (item: CatalogItem) => {
    const res = validateQuantity(qty);
    if (!res.ok) {
      setQtyError(t(lang, "invalidQuantity"));
      return;
    }
    if (!canAddEntry()) {
      setShowLimitModal(true);
      return;
    }
    const amount = Math.round(item.price * res.value * 100) / 100;
    const result = addEntry({
      type: "income",
      amount,
      quantity: res.value,
      unitPrice: item.price,
      category: item.category,
      note: note.trim() || item.name,
      method: "catalog",
      catalogItemId: item.id,
    });
    if (result.ok) {
      setActiveSaleId(null);
      setSavedFlashId(item.id);
      showToast(t(lang, "saved"));
      window.setTimeout(() => setSavedFlashId((cur) => (cur === item.id ? null : cur)), 1400);
    } else {
      setShowLimitModal(true);
    }
  };

  const openNew = () => {
    setForm({ name: "", price: "", category: "Food" });
    setNameError(null);
    setPriceError(null);
    setEditingItem("new");
  };

  const openEdit = (item: CatalogItem) => {
    setForm({ name: item.name, price: String(item.price), category: item.category });
    setNameError(null);
    setPriceError(null);
    setEditingItem(item);
  };

  const submitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    let hasError = false;
    if (!name) {
      setNameError(t(lang, "requiredField"));
      hasError = true;
    } else {
      setNameError(null);
    }
    const priceResult = validateAmount(form.price);
    if (!priceResult.ok) {
      setPriceError(t(lang, "invalidAmount"));
      hasError = true;
    } else {
      setPriceError(null);
    }
    if (hasError) return;

    if (editingItem === "new") {
      addCatalogItem({ name, price: priceResult.value, category: form.category });
      showToast(t(lang, "saved"));
    } else if (editingItem) {
      updateCatalogItem(editingItem.id, { name, price: priceResult.value, category: form.category });
      showToast(t(lang, "saved"));
    }
    setEditingItem(null);
  };

  if (showLimitModal) {
    return (
      <div className="screen">
        <TopBar title={t(lang, "catalog")} onBack={() => navigate(-1)} />
        <LimitModal onClose={() => setShowLimitModal(false)} />
        <TabBar />
      </div>
    );
  }

  return (
    <div className="screen">
      <TopBar title={t(lang, "catalog")} onBack={() => navigate(-1)} />
      <div className="page">
        <button className="btn btn-secondary btn-block" onClick={openNew}>
          <IconPlus size={18} /> {t(lang, "addItem")}
        </button>

        {state.catalogItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><IconReceipt size={26} /></div>
            <p style={{ margin: 0 }}>{t(lang, "noCatalogItems")}</p>
          </div>
        ) : (
          <div className="catalog-grid">
            {state.catalogItems.map((item) => {
              const isActive = activeSaleId === item.id;
              const isSaved = savedFlashId === item.id;
              return (
                <div key={item.id} className={"catalog-tile" + (isSaved ? " saved" : "")}>
                  <div className="catalog-tile-top">
                    <button className="catalog-tile-btn" onClick={() => (isActive ? closeSale() : openSale(item))}>
                      <span className="catalog-tile-name">{item.name}</span>
                      <span className="catalog-tile-price">{formatRM(item.price)}</span>
                    </button>
                    <button
                      className="catalog-tile-pencil"
                      onClick={() => openEdit(item)}
                      aria-label={t(lang, "edit")}
                    >
                      <IconEdit size={15} />
                    </button>
                  </div>

                  {isSaved && !isActive && (
                    <div className="catalog-tile-saved-flash">
                      <IconCheck size={13} /> {t(lang, "saved")}
                    </div>
                  )}

                  {isActive && (
                    <div className="catalog-sale-panel">
                      <div className="catalog-sale-stepper">
                        <button onClick={() => adjustQty(-1)} disabled={qty <= 1} aria-label="decrease">
                          <IconMinus size={16} />
                        </button>
                        <span className="qty-value">{qty}</span>
                        <button onClick={() => adjustQty(1)} aria-label="increase">
                          <IconPlus size={16} />
                        </button>
                      </div>
                      <div className="field catalog-sale-note">
                        <input
                          placeholder={t(lang, "optionalNote")}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          maxLength={60}
                        />
                      </div>
                      {qtyError && <span className="field-error">{qtyError}</span>}
                      <div className="muted" style={{ fontSize: "var(--text-sm)" }}>
                        {qty} × {formatRM(item.price)} = {formatRM(item.price * qty)}
                      </div>
                      <div className="catalog-sale-actions">
                        <button className="btn btn-secondary" onClick={closeSale}>
                          {t(lang, "cancel")}
                        </button>
                        <button className="btn btn-primary" onClick={() => confirmSale(item)}>
                          {t(lang, "confirm")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <TabBar />

      {editingItem && (
        <div className="modal-backdrop" onClick={() => setEditingItem(null)}>
          <form className="modal-sheet" onClick={(e) => e.stopPropagation()} onSubmit={submitEdit}>
            <h2 style={{ margin: 0, fontSize: "var(--text-lg)" }}>
              {editingItem === "new" ? t(lang, "addCatalogItem") : t(lang, "edit")}
            </h2>
            <div className="field">
              <label htmlFor="itemName">{t(lang, "name")}</label>
              <input
                id="itemName"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={60}
              />
              {nameError && <span className="field-error">{nameError}</span>}
            </div>
            <div className="field">
              <label htmlFor="itemPrice">{t(lang, "price")} (RM)</label>
              <input
                id="itemPrice"
                inputMode="decimal"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              {priceError && <span className="field-error">{priceError}</span>}
            </div>
            <div className="field">
              <label htmlFor="itemCategory">{t(lang, "category")}</label>
              <select
                id="itemCategory"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {editingItem !== "new" && (
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={() => {
                  setDeleteTarget(editingItem);
                }}
              >
                <IconTrash size={16} /> {t(lang, "delete")}
              </button>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setEditingItem(null)}>
                {t(lang, "cancel")}
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                {t(lang, "save")}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          title={t(lang, "delete")}
          message={t(lang, "deleteConfirm")}
          confirmLabel={t(lang, "delete")}
          danger
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            deleteCatalogItem(deleteTarget.id);
            showToast(t(lang, "saved"));
            setDeleteTarget(null);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};
