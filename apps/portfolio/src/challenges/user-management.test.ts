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
  clearSession,
  createUser,
  deleteUser,
  getCurrentUser,
  listUsers,
  loadSession,
  saveSession,
  signIn,
  signUp,
  updateUser,
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

  it("signs up with a token-bearing session for the submitted identity", async () => {
    const session = await signUp("new.user@example.test", "ExamplePass123!");
    expect(session.token).toMatch(/^demo-token-/);
    expect(session.user).toMatchObject({
      email: "new.user@example.test",
      firstName: "New",
    });
  });

  it("rejects malformed sessions and clears stored sessions", async () => {
    const storage = new MemoryStorage();
    storage.setItem(SESSION_KEY, "not-json");
    expect(loadSession(storage)).toBeNull();

    storage.setItem(SESSION_KEY, JSON.stringify({ token: "demo-token-incomplete" }));
    expect(loadSession(storage)).toBeNull();

    saveSession(storage, await signIn(DEMO_EMAIL, DEMO_PASSWORD));
    clearSession(storage);
    expect(storage.getItem(SESSION_KEY)).toBeNull();
    expect(loadSession(storage)).toBeNull();
  });

  it("enforces tokens on every protected user operation", async () => {
    const users = freshUsers();
    const session = { token: "invalid", user: users[0] };
    const draft = { firstName: "A", lastName: "B", email: "a@example.test" };
    const protectedCalls = [
      () => getCurrentUser("invalid", session),
      () => listUsers("", users),
      () => createUser("invalid", users, draft),
      () => updateUser("", users, users[0].id, draft),
      () => deleteUser("invalid", users, users[0].id),
    ];

    for (const call of protectedCalls) {
      await expect(call()).rejects.toThrow("valid session token");
    }
  });

  it("runs every protected user operation with a valid token", async () => {
    const session = await signIn(DEMO_EMAIL, DEMO_PASSWORD);
    const users = freshUsers();
    const draft = { firstName: "Rowan", lastName: "Stone", email: "rowan@example.test" };

    await expect(getCurrentUser(session.token, session)).resolves.toEqual(session.user);
    await expect(listUsers(session.token, users)).resolves.toEqual(users);
    const created = await createUser(session.token, users, draft);
    const createdUser = created.at(-1)!;
    const updated = await updateUser(session.token, created, createdUser.id, { ...draft, lastName: "Vale" });
    const deleted = await deleteUser(session.token, updated, createdUser.id);

    expect(createdUser).toMatchObject(draft);
    expect(updated.at(-1)?.lastName).toBe("Vale");
    expect(deleted).toHaveLength(users.length);
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
