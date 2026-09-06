export function normalizeSrn(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidSrn(value: string) {
  return /^[A-Z0-9]{6,24}$/.test(normalizeSrn(value));
}

// Supabase password auth requires an email or phone identifier. The address is
// internal-only; students still enter only their SRN and password.
export function srnToAuthEmail(value: string) {
  return `${normalizeSrn(value).toLowerCase()}@accounts.layer8.local`;
}
