export function formatRM(amount: number): string {
  const fixed = Math.abs(amount).toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const sign = amount < 0 ? "-" : "";
  return `${sign}RM${withThousands}.${decPart}`;
}

export function parseAmountInput(raw: string): number | null {
  if (raw.trim() === "") return null;
  const n = Number(raw);
  if (Number.isNaN(n)) return null;
  return Math.round(n * 100) / 100;
}

export function validateAmount(raw: string): { ok: boolean; value: number; error?: string } {
  const n = parseAmountInput(raw);
  if (n === null || Number.isNaN(n) || n <= 0) {
    return { ok: false, value: 0, error: "invalidAmount" };
  }
  return { ok: true, value: n };
}

export function validateQuantity(raw: string | number): { ok: boolean; value: number; error?: string } {
  const n = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 1) {
    return { ok: false, value: 0, error: "invalidQuantity" };
  }
  return { ok: true, value: n };
}

export function isSameLocalDay(iso: string, ref: Date): boolean {
  const d = new Date(iso);
  return (
    d.getFullYear() === ref.getFullYear() &&
    d.getMonth() === ref.getMonth() &&
    d.getDate() === ref.getDate()
  );
}

export function startOfWeek(ref: Date): Date {
  const d = new Date(ref);
  const day = d.getDay(); // 0 sun
  const diff = (day + 6) % 7; // days since Monday
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function startOfMonth(ref: Date): Date {
  const d = new Date(ref.getFullYear(), ref.getMonth(), 1);
  d.setHours(0, 0, 0, 0);
  return d;
}
