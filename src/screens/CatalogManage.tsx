import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { formatRM, validateAmount } from "../utils";
import { TopBar } from "../components/TopBar";
import { TabBar } from "../components/TabBar";
import { ConfirmModal } from "../components/ConfirmModal";
import { useToast } from "../components/Toast";
import type { CatalogItem } from "../types";

const CATEGORY_OPTIONS = ["Food", "Beverage", "Snack", "Ingredients", "Other"];

interface FormState {
  name: string;
  price: string;
  category: string;
}

export const CatalogManage: React.FC = () => {
  const { state, addCatalogItem, updateCatalogItem, deleteCatalogItem } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [editingItem, setEditingItem] = useState<CatalogItem | "new" | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", price: "", category: "Food" });
  const [nameError, setNameError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CatalogItem | null>(null);

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

  const submit = (e: React.FormEvent) => {
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
      showToast("Added");
    } else if (editingItem) {
      updateCatalogItem(editingItem.id, { name, price: priceResult.value, category: form.category });
      showToast("Saved");
    }
    setEditingItem(null);
  };

  if (editingItem) {
    return (
      <div className="screen">
        <TopBar title={editingItem === "new" ? t(lang, "addCatalogItem") : t(lang, "edit")} onBack={() => setEditingItem(null)} />
        <form className="page" onSubmit={submit}>
          <div className="field">
            <label htmlFor="itemName">{t(lang, "name")}</label>
            <input id="itemName" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={60} />
            {nameError && <span className="field-error">{nameError}</span>}
          </div>
          <div className="field">
            <label htmlFor="itemPrice">{t(lang, "price")} (RM)</label>
            <input id="itemPrice" inputMode="decimal" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            {priceError && <span className="field-error">{priceError}</span>}
          </div>
          <div className="field">
            <label htmlFor="itemCategory">{t(lang, "category")}</label>
            <select id="itemCategory" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
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
    );
  }

  return (
    <div className="screen">
      <TopBar title={t(lang, "catalog")} onBack={() => navigate(-1)} />
      <div className="page">
        <button className="btn btn-primary btn-block" onClick={openNew}>
          + {t(lang, "addCatalogItem")}
        </button>

        {state.catalogItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p style={{ margin: 0 }}>{t(lang, "noCatalogItems")}</p>
          </div>
        ) : (
          <div className="card" style={{ padding: "4px 14px" }}>
            {state.catalogItems.map((item) => (
              <div key={item.id} className="entry-row">
                <div className="entry-main">
                  <div className="entry-note">{item.name}</div>
                  <div className="entry-meta">{item.category} · {formatRM(item.price)}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn btn-secondary" style={{ padding: "8px 12px", minHeight: 36 }} onClick={() => openEdit(item)}>
                    {t(lang, "edit")}
                  </button>
                  <button className="btn btn-danger" style={{ padding: "8px 12px", minHeight: 36 }} onClick={() => setDeleteTarget(item)}>
                    {t(lang, "delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <TabBar />

      {deleteTarget && (
        <ConfirmModal
          title={t(lang, "delete")}
          message={t(lang, "deleteConfirm")}
          confirmLabel={t(lang, "delete")}
          danger
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            deleteCatalogItem(deleteTarget.id);
            showToast("Deleted");
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
};
