export type Language = "bm" | "en" | "zh" | "ta";
export type Tier = "free" | "solo" | "business" | "pro";
export type EntryType = "income" | "expense";
export type Method = "photo" | "voice" | "catalog" | "manual";

export interface Entry {
  id: string;
  type: EntryType;
  amount: number;
  quantity: number;
  unitPrice: number | null;
  category: string;
  note: string;
  method: Method;
  catalogItemId: string | null;
  createdAt: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface AppState {
  onboarded: boolean;
  language: Language;
  tier: Tier;
  turnover: number;
  entries: Entry[];
  catalogItems: CatalogItem[];
}

export const TIER_LIMITS: Record<Tier, number> = {
  free: 10,
  solo: 30,
  business: 100,
  pro: Infinity,
};

export const TIER_AI_LABEL: Record<Tier, string> = {
  free: "DeepSeek Lite",
  solo: "DeepSeek V2",
  business: "DeepSeek R1",
  pro: "DeepSeek R1 + Alibaba Qwen Max",
};
