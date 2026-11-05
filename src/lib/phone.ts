
export function normalizeKenyanPhone(phone: string): string | null {
  const compact = phone.replace(/[\s()-]/g, "");

  // Local format: 07XXXXXXXX or 01XXXXXXXX
  if (/^0[17]\d{8}$/.test(compact)) {
    return `+254${compact.slice(1)}`;
  }

  // International format: +2547XXXXXXXX / +2541XXXXXXXX
  if (/^\+254[17]\d{8}$/.test(compact)) {
    return compact;
  }

  // International format without the plus sign.
  if (/^254[17]\d{8}$/.test(compact)) {
    return `+${compact}`;
  }

  return null;
}

export function isKenyanPhone(phone: string): boolean {
  return normalizeKenyanPhone(phone) !== null;
}
