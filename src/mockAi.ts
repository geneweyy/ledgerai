export interface MockReceiptResult {
  vendor: string;
  amount: number;
  category: string;
  date: string;
}

export const mockReceipts: MockReceiptResult[] = [
  { vendor: "Restoran Nasi Kandar Pelita", amount: 24.5, category: "Food", date: new Date().toISOString() },
  { vendor: "Pasar Borong Selayang", amount: 132.0, category: "Ingredients", date: new Date().toISOString() },
  { vendor: "Petronas Kedai Mesra", amount: 60.0, category: "Transport", date: new Date().toISOString() },
  { vendor: "Kedai Runcit Ah Seng", amount: 18.9, category: "Supplies", date: new Date().toISOString() },
  { vendor: "99 Speedmart", amount: 45.2, category: "Supplies", date: new Date().toISOString() },
  { vendor: "Restoran Kak Yah", amount: 8.5, category: "Food", date: new Date().toISOString() },
];

export interface MockVoiceResult {
  amount: number;
  category: string;
  note: string;
  type: "income" | "expense";
}

export const mockVoicePhrasesBM: MockVoiceResult[] = [
  { amount: 15, category: "Food", note: "Jual nasi lemak sepuluh bungkus", type: "income" },
  { amount: 8, category: "Beverage", note: "Jual teh tarik empat gelas", type: "income" },
  { amount: 30, category: "Ingredients", note: "Beli ayam di pasar", type: "expense" },
  { amount: 12, category: "Utilities", note: "Bayar gas dapur", type: "expense" },
  { amount: 22, category: "Food", note: "Jual mee goreng empat pinggan", type: "income" },
];

export const mockVoicePhrasesEN: MockVoiceResult[] = [
  { amount: 18, category: "Food", note: "Sold six plates of fried noodles", type: "income" },
  { amount: 6, category: "Beverage", note: "Sold three iced coffees", type: "income" },
  { amount: 40, category: "Rent", note: "Paid daily stall rental", type: "expense" },
  { amount: 10, category: "Supplies", note: "Bought packaging boxes", type: "expense" },
  { amount: 27.5, category: "Food", note: "Sold five roti canai sets", type: "income" },
];

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Roughly 1-in-6 failure chance
export function shouldSimulateFailure(): boolean {
  return Math.floor(Math.random() * 6) === 0;
}
