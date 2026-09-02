import { describe, expect, it } from "vitest";
import { freshUsers } from "@challenge/user-management-demo/fixtures";
import {
  createUser as createUserLogic,
  deleteUser as deleteUserLogic,
  pageCount,
  parseTheme,
  updateUser as updateUserLogic,
  usersForPage,
  validPage,
  validatePasswordConfirmation,
} from "@challenge/user-management-demo/logic";
import {
  DEMO_EMAIL,
  DEMO_PASSWORD,
  SESSION_KEY,
  createUser,
  listUsers,
  loadSession,
  saveSession,
  signIn,
} from "@challenge/user-management-demo/services";

class MemoryStorage {
  values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
}

describe("user management business logic", () => {
  it("rejects a password mismatch before authentication", () => {
    expect(validatePasswordConfirmation("long-password", "different-password")).toBe("Passwords do not match.");
    expect(validatePasswordConfirmation("long-password", "long-password")).toBeNull();
  });

  it("signs in independently and serializes a token-bearing session", async () => {
    const storage = new MemoryStorage();
    const session = await signIn(DEMO_EMAIL, DEMO_PASSWORD);
    saveSession(storage, session);
    expect(session.token).toMatch(/^demo-token-/);
    expect(loadSession(storage)).toEqual(session);
    expect(storage.getItem(SESSION_KEY)).toContain(session.token);
  });

  it("enforces tokens on protected user operations", async () => {
    await expect(listUsers("", freshUsers())).rejects.toThrow("valid session token");
    await expect(createUser("invalid", freshUsers(), { firstName: "A", lastName: "B", email: "a@example.test" })).rejects.toThrow("valid session token");
  });

  it("paginates exactly six records and corrects an invalid page", () => {
    const users = freshUsers();
    expect(usersForPage(users, 1)).toHaveLength(6);
    expect(usersForPage(users, 3)).toHaveLength(2);
    expect(pageCount(users)).toBe(3);
    expect(validPage(3, users.slice(0, 12))).toBe(2);
  });

  it("creates, updates, and deletes users without mutating the fixture", () => {
    const users = freshUsers();
    const created = createUserLogic(users, { firstName: "Rowan", lastName: "Stone", email: "rowan@example.test" });
    const id = created.at(-1)!.id;
    const updated = updateUserLogic(created, id, { firstName: "Rowan", lastName: "Vale", email: "rowan.vale@example.test" });
    const deleted = deleteUserLogic(updated, id);
    expect(created).toHaveLength(15);
    expect(updated.at(-1)?.lastName).toBe("Vale");
    expect(deleted).toHaveLength(14);
    expect(freshUsers()).toEqual(users);
  });

  it("restores fresh fixture copies and parses persisted themes", () => {
    const first = freshUsers();
    first.pop();
    expect(freshUsers()).toHaveLength(14);
    expect(parseTheme("dark")).toBe("dark");
    expect(parseTheme(null, true)).toBe("dark");
    expect(parseTheme("invalid", false)).toBe("light");
  });
});
