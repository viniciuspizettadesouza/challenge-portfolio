import { freshUsers } from "./fixtures";
import { createUser as addUser, deleteUser as removeUser, updateUser as editUser } from "./logic";
import type { Session, StorageLike, User, UserDraft } from "./types";

export const SESSION_KEY = "user-management/session";
export const DEMO_EMAIL = "admin@example.test";
export const DEMO_PASSWORD = "DemoPass123!";

const administrator = freshUsers()[0];
const tick = async () => Promise.resolve();

function tokenFor(email: string): string {
  return `demo-token-${email.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
}

function requireToken(token: string): void {
  if (!token.startsWith("demo-token-")) throw new Error("A valid session token is required.");
}

export async function signIn(email: string, password: string): Promise<Session> {
  await tick();
  if (email.toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    throw new Error("Use the seeded administrator credentials shown below.");
  }
  return { token: tokenFor(email), user: { ...administrator } };
}

export async function signUp(email: string, password: string): Promise<Session> {
  await tick();
  if (!email.includes("@") || password.length < 8) {
    throw new Error("Enter a valid email and a password of at least 8 characters.");
  }
  return {
    token: tokenFor(email),
    user: { ...administrator, email, firstName: "New" },
  };
}

export function saveSession(storage: StorageLike, session: Session): void {
  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadSession(storage: StorageLike): Session | null {
  try {
    const parsed = JSON.parse(storage.getItem(SESSION_KEY) ?? "null") as Session | null;
    return parsed?.token && parsed.user ? parsed : null;
  } catch {
    return null;
  }
}

export function clearSession(storage: StorageLike): void {
  storage.removeItem(SESSION_KEY);
}

export async function getCurrentUser(token: string, session: Session): Promise<User> {
  await tick();
  requireToken(token);
  return { ...session.user };
}

export async function listUsers(token: string, users: readonly User[]): Promise<User[]> {
  await tick();
  requireToken(token);
  return users.map((user) => ({ ...user }));
}

export async function createUser(token: string, users: readonly User[], draft: UserDraft): Promise<User[]> {
  await tick();
  requireToken(token);
  return addUser(users, draft);
}

export async function updateUser(token: string, users: readonly User[], id: number, draft: UserDraft): Promise<User[]> {
  await tick();
  requireToken(token);
  return editUser(users, id, draft);
}

export async function deleteUser(token: string, users: readonly User[], id: number): Promise<User[]> {
  await tick();
  requireToken(token);
  return removeUser(users, id);
}
