const accountsKey = "trainova.accounts.v1";
export const sessionKey = "trainova.session.v1";

const normalize = (value) => value.trim().toLowerCase();
const readAccounts = () => JSON.parse(localStorage.getItem(accountsKey) || "[]");

async function passwordHash(password, salt) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", iterations: 600000, salt: Uint8Array.from(salt) },
    key, 256
  );
  return Array.from(new Uint8Array(bits)).join(".");
}

export function currentSession() {
  try {
    const email = localStorage.getItem(sessionKey);
    return email && readAccounts().some((account) => account.email === email) ? email : null;
  } catch {
    return null;
  }
}

// Returns translation keys for field errors (see i18n/translations.js), or {} on success.
export async function registerAccount(username, email, password) {
  username = normalize(username);
  email = normalize(email);
  const accounts = readAccounts();
  if (accounts.some((account) => account.username === username)) {
    return { username: "err.usernameTaken" };
  }
  if (accounts.some((account) => account.email === email)) {
    return { email: "err.emailTaken" };
  }
  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)));
  const hash = await passwordHash(password, salt);
  accounts.push({ username, email, salt, hash });
  localStorage.setItem(accountsKey, JSON.stringify(accounts));
  return {};
}

export async function verifyLogin(identifier, password) {
  const login = normalize(identifier);
  const account = readAccounts().find(({ username, email }) => username === login || email === login);
  if (!account || await passwordHash(password, account.salt) !== account.hash) return null;
  return account.email;
}
