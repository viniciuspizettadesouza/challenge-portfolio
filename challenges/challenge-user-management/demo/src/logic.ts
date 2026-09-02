import type { User, UserDraft } from "./types";

export const USERS_PER_PAGE = 6;

export function validatePasswordConfirmation(password: string, confirmation: string): string | null {
  return password === confirmation ? null : "Passwords do not match.";
}

export function pageCount(users: readonly User[]): number {
  return Math.max(1, Math.ceil(users.length / USERS_PER_PAGE));
}

export function validPage(requestedPage: number, users: readonly User[]): number {
  return Math.min(Math.max(1, requestedPage), pageCount(users));
}

export function usersForPage(users: readonly User[], page: number): User[] {
  const safePage = validPage(page, users);
  const start = (safePage - 1) * USERS_PER_PAGE;
  return users.slice(start, start + USERS_PER_PAGE);
}

export function createUser(users: readonly User[], draft: UserDraft): User[] {
  const nextId = Math.max(0, ...users.map(({ id }) => id)) + 1;
  return [...users, { ...draft, id: nextId, role: "Member" }];
}

export function updateUser(users: readonly User[], id: number, draft: UserDraft): User[] {
  return users.map((user) => user.id === id ? { ...user, ...draft } : user);
}

export function deleteUser(users: readonly User[], id: number): User[] {
  return users.filter((user) => user.id !== id);
}

export type Theme = "light" | "dark";

export function parseTheme(value: string | null, systemDark = false): Theme {
  return value === "light" || value === "dark" ? value : systemDark ? "dark" : "light";
}
