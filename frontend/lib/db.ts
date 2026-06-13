import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import type { User, WatchlistItem, Prediction } from "./types";

const DATA_DIR = path.join(process.cwd(), "frontend", "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJSON<T>(filename: string): T[] {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
    return [];
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T[];
}

function writeJSON<T>(filename: string, data: T[]) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function genId(): string {
  return crypto.randomUUID();
}

// ── Users ───────────────────────────────────────────────────────────────────

export function getUsers(): User[] {
  return readJSON<User>("users.json");
}

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error("User already exists");
  }
  const hashed = await bcrypt.hash(password, 10);
  const user: User = {
    id: genId(),
    email,
    password: hashed,
    name,
    created_at: new Date().toISOString(),
  };
  users.push(user);
  writeJSON("users.json", users);
  return user;
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email === email);
}

export async function verifyPassword(
  email: string,
  password: string
): Promise<User | null> {
  const user = getUserByEmail(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : null;
}

// ── Watchlist ───────────────────────────────────────────────────────────────

export function getWatchlist(userId: string): WatchlistItem[] {
  return readJSON<WatchlistItem>("watchlists.json").filter(
    (w) => w.user_id === userId
  );
}

export function addToWatchlist(
  userId: string,
  symbol: string,
  name: string
): WatchlistItem {
  const items = readJSON<WatchlistItem>("watchlists.json");
  if (items.find((w) => w.user_id === userId && w.symbol === symbol)) {
    throw new Error("Ticker already in watchlist");
  }
  const item: WatchlistItem = {
    id: genId(),
    user_id: userId,
    symbol: symbol.toUpperCase(),
    name,
    added_at: new Date().toISOString(),
  };
  items.push(item);
  writeJSON("watchlists.json", items);
  return item;
}

export function removeFromWatchlist(userId: string, ticker: string): boolean {
  const items = readJSON<WatchlistItem>("watchlists.json");
  const filtered = items.filter(
    (w) => !(w.user_id === userId && w.symbol === ticker.toUpperCase())
  );
  if (filtered.length === items.length) return false;
  writeJSON("watchlists.json", filtered);
  return true;
}

// ── Predictions ─────────────────────────────────────────────────────────────

export function getPredictions(userId: string): Prediction[] {
  return readJSON<Prediction>("predictions.json").filter(
    (p) => p.user_id === userId
  );
}

export function addPrediction(
  userId: string,
  prediction: Omit<Prediction, "id" | "user_id">
): Prediction {
  const items = readJSON<Prediction>("predictions.json");
  const pred: Prediction = {
    id: genId(),
    user_id: userId,
    ...prediction,
  };
  items.push(pred);
  writeJSON("predictions.json", items);
  return pred;
}
