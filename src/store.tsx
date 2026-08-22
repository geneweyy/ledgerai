import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import type { AppState, Entry, CatalogItem, Language, Tier } from "./types";
import { TIER_LIMITS } from "./types";
import { seedCatalogItems, seedEntries } from "./seed";

const STORAGE_KEY = "ledgerai_state";

function freshState(): AppState {
  return {
    onboarded: false,
    language: "en",
    tier: "free",
    turnover: 0,
    entries: [],
    catalogItems: seedCatalogItems(),
  };
}

function loadState(): AppState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // basic shape guard
      if (parsed && typeof parsed === "object" && Array.isArray(parsed.entries)) {
        return { ...freshState(), ...parsed };
      }
    }
  } catch {
    // ignore, fall back to fresh in-memory state
  }
  return freshState();
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

interface StoreContextValue {
  state: AppState;
  todaysEntries: Entry[];
  dailyLimit: number;
  limitReached: boolean;
  canAddEntry: () => boolean;
  addEntry: (e: Omit<Entry, "id" | "createdAt">) => { ok: boolean; entry?: Entry };
  updateEntry: (id: string, patch: Partial<Omit<Entry, "id" | "createdAt">>) => void;
  deleteEntry: (id: string) => void;
  addCatalogItem: (item: Omit<CatalogItem, "id">) => CatalogItem;
  updateCatalogItem: (id: string, patch: Partial<Omit<CatalogItem, "id">>) => void;
  deleteCatalogItem: (id: string) => void;
  setLanguage: (l: Language) => void;
  setTier: (t: Tier) => void;
  setTurnover: (n: number) => void;
  completeOnboarding: (lang: Language) => void;
  resetDemoData: () => void;
  eInvoiceUnlocked: boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable (e.g. private browsing quota) — continue in-memory
    }
  }, [state]);

  const todaysEntries = useMemo(
    () => state.entries.filter((e) => isToday(e.createdAt)),
    [state.entries]
  );

  const dailyLimit = TIER_LIMITS[state.tier];
  const limitReached = todaysEntries.length >= dailyLimit;

  const canAddEntry = useCallback(() => {
    return todaysEntries.length < TIER_LIMITS[state.tier];
  }, [todaysEntries.length, state.tier]);

  const addEntry = useCallback(
    (e: Omit<Entry, "id" | "createdAt">) => {
      let result: { ok: boolean; entry?: Entry } = { ok: false };
      setState((prev) => {
        const todayCount = prev.entries.filter((en) => isToday(en.createdAt)).length;
        if (todayCount >= TIER_LIMITS[prev.tier]) {
          result = { ok: false };
          return prev;
        }
        const entry: Entry = { ...e, id: uid(), createdAt: new Date().toISOString() };
        result = { ok: true, entry };
        return { ...prev, entries: [...prev.entries, entry] };
      });
      return result;
    },
    []
  );

  const updateEntry = useCallback((id: string, patch: Partial<Omit<Entry, "id" | "createdAt">>) => {
    setState((prev) => ({
      ...prev,
      entries: prev.entries.map((en) => (en.id === id ? { ...en, ...patch } : en)),
    }));
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setState((prev) => ({ ...prev, entries: prev.entries.filter((en) => en.id !== id) }));
  }, []);

  const addCatalogItem = useCallback((item: Omit<CatalogItem, "id">) => {
    const newItem: CatalogItem = { ...item, id: uid() };
    setState((prev) => ({ ...prev, catalogItems: [...prev.catalogItems, newItem] }));
    return newItem;
  }, []);

  const updateCatalogItem = useCallback((id: string, patch: Partial<Omit<CatalogItem, "id">>) => {
    setState((prev) => ({
      ...prev,
      catalogItems: prev.catalogItems.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const deleteCatalogItem = useCallback((id: string) => {
    setState((prev) => ({ ...prev, catalogItems: prev.catalogItems.filter((c) => c.id !== id) }));
  }, []);

  const setLanguage = useCallback((l: Language) => {
    setState((prev) => ({ ...prev, language: l }));
  }, []);

  const setTier = useCallback((tier: Tier) => {
    setState((prev) => ({ ...prev, tier }));
  }, []);

  const setTurnover = useCallback((n: number) => {
    setState((prev) => ({ ...prev, turnover: n }));
  }, []);

  const completeOnboarding = useCallback((lang: Language) => {
    setState(() => ({
      onboarded: true,
      language: lang,
      tier: "free",
      turnover: 0,
      entries: seedEntries(),
      catalogItems: seedCatalogItems(),
    }));
  }, []);

  const resetDemoData = useCallback(() => {
    setState(() => ({
      onboarded: true,
      language: "en",
      tier: "free",
      turnover: 0,
      entries: seedEntries(),
      catalogItems: seedCatalogItems(),
    }));
  }, []);

  const eInvoiceUnlocked = state.tier === "pro" && state.turnover > 1000000;

  const value: StoreContextValue = {
    state,
    todaysEntries,
    dailyLimit,
    limitReached,
    canAddEntry,
    addEntry,
    updateEntry,
    deleteEntry,
    addCatalogItem,
    updateCatalogItem,
    deleteCatalogItem,
    setLanguage,
    setTier,
    setTurnover,
    completeOnboarding,
    resetDemoData,
    eInvoiceUnlocked,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
