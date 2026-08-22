import type { Entry, CatalogItem } from "./types";

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function daysAgoISO(days: number, hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export function seedCatalogItems(): CatalogItem[] {
  return [
    { id: uid(), name: "Nasi Lemak", price: 3.0, category: "Food" },
    { id: uid(), name: "Teh Tarik", price: 2.0, category: "Beverage" },
    { id: uid(), name: "Mee Goreng", price: 5.5, category: "Food" },
    { id: uid(), name: "Roti Canai", price: 1.5, category: "Food" },
    { id: uid(), name: "Kopi O", price: 1.8, category: "Beverage" },
    { id: uid(), name: "Curry Puff", price: 1.2, category: "Snack" },
    { id: uid(), name: "Satay (10 sticks)", price: 8.0, category: "Food" },
  ];
}

export function seedEntries(): Entry[] {
  const e: Entry[] = [];
  e.push({ id: uid(), type: "income", amount: 6.0, quantity: 2, unitPrice: 3.0, category: "Food", note: "Nasi Lemak x2", method: "catalog", catalogItemId: null, createdAt: daysAgoISO(4, 8, 15) });
  e.push({ id: uid(), type: "income", amount: 15.5, quantity: 1, unitPrice: null, category: "Food", note: "Mee Goreng combo", method: "manual", catalogItemId: null, createdAt: daysAgoISO(4, 12, 30) });
  e.push({ id: uid(), type: "expense", amount: 45.0, quantity: 1, unitPrice: null, category: "Ingredients", note: "Pasar Borong - rice & chicken", method: "manual", catalogItemId: null, createdAt: daysAgoISO(4, 6, 0) });

  e.push({ id: uid(), type: "income", amount: 21.6, quantity: 12, unitPrice: 1.8, category: "Beverage", note: "Kopi O x12", method: "catalog", catalogItemId: null, createdAt: daysAgoISO(3, 9, 0) });
  e.push({ id: uid(), type: "expense", amount: 12.0, quantity: 1, unitPrice: null, category: "Utilities", note: "Gas tank refill", method: "manual", catalogItemId: null, createdAt: daysAgoISO(3, 15, 45) });

  e.push({ id: uid(), type: "income", amount: 32.0, quantity: 4, unitPrice: 8.0, category: "Food", note: "Satay 4 sets", method: "catalog", catalogItemId: null, createdAt: daysAgoISO(2, 19, 0) });
  e.push({ id: uid(), type: "income", amount: 9.0, quantity: 6, unitPrice: 1.5, category: "Food", note: "Roti Canai x6", method: "catalog", catalogItemId: null, createdAt: daysAgoISO(2, 8, 30) });
  e.push({ id: uid(), type: "expense", amount: 60.0, quantity: 1, unitPrice: null, category: "Rent", note: "Stall rental - daily", method: "manual", catalogItemId: null, createdAt: daysAgoISO(2, 7, 0) });

  e.push({ id: uid(), type: "income", amount: 18.0, quantity: 9, unitPrice: 2.0, category: "Beverage", note: "Teh Tarik x9", method: "voice", catalogItemId: null, createdAt: daysAgoISO(1, 10, 0) });
  e.push({ id: uid(), type: "income", amount: 27.5, quantity: 5, unitPrice: 5.5, category: "Food", note: "Mee Goreng x5", method: "photo", catalogItemId: null, createdAt: daysAgoISO(1, 13, 20) });
  e.push({ id: uid(), type: "expense", amount: 8.5, quantity: 1, unitPrice: null, category: "Supplies", note: "Plastic bags & containers", method: "manual", catalogItemId: null, createdAt: daysAgoISO(1, 16, 0) });

  e.push({ id: uid(), type: "income", amount: 3.6, quantity: 3, unitPrice: 1.2, category: "Snack", note: "Curry Puff x3", method: "catalog", catalogItemId: null, createdAt: daysAgoISO(0, 8, 10) });

  return e;
}
