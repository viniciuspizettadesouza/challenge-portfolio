import { describe, expect, it } from "vitest";
import { freshUsers } from "@challenge/people-operations-demo/fixtures";
import {
  createUser as createUserLogic,
  deleteUser as deleteUserLogic,
  pageCount,
  parseTheme,
  filterBySuperior,
  searchUsers,
  similarity,
  updateUser as updateUserLogic,
  usersForPage,
  validPage,
  validatePasswordConfirmation,
  validateUserDraft,
} from "@challenge/people-operations-demo/logic";
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
} from "@challenge/people-operations-demo/services";
import type { UserDraft } from "@challenge/people-operations-demo";

const draft = (overrides: Partial<UserDraft> = {}): UserDraft => ({
  firstName: "Rowan",
  lastName: "Stone",
  email: "rowan@example.test",
  telephone: "+351 210 000 000",
  position: "Consultant",
  department: "Operations",
  login: "rstone",
  cpf: "111.222.333-44",
  superiorId: 1,
  address: null,
  password: "local-only",
  ...overrides,
});

class MemoryStorage {
  values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
}

describe("consolidated people operations business logic", () => {
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
    const invalidTokenDraft = draft();
    const protectedCalls = [
      () => getCurrentUser("invalid", session),
      () => listUsers("", users),
      () => createUser("invalid", users, invalidTokenDraft),
      () => updateUser("", users, users[0].id, invalidTokenDraft),
      () => deleteUser("invalid", users, users[0].id),
    ];

    for (const call of protectedCalls) {
      await expect(call()).rejects.toThrow("valid session token");
    }
  });

  it("runs every protected user operation with a valid token", async () => {
    const session = await signIn(DEMO_EMAIL, DEMO_PASSWORD);
    const users = freshUsers();
    const userDraft = draft();

    await expect(getCurrentUser(session.token, session)).resolves.toEqual(session.user);
    await expect(listUsers(session.token, users)).resolves.toEqual(users);
    const created = await createUser(session.token, users, userDraft);
    const createdUser = created.at(-1)!;
    const updated = await updateUser(session.token, created, createdUser.id, { ...userDraft, lastName: "Vale" });
    const deleted = await deleteUser(session.token, updated, createdUser.id);

    expect(createdUser).toMatchObject({ firstName: "Rowan", lastName: "Stone" });
    expect(createdUser).not.toHaveProperty("password");
    expect(updated.at(-1)?.lastName).toBe("Vale");
    expect(deleted).toHaveLength(users.length);
  });

  it("paginates exactly six records and corrects an invalid page", () => {
    const users = freshUsers();
    expect(usersForPage(users, 1)).toHaveLength(6);
    expect(usersForPage(users, 3)).toHaveLength(5);
    expect(pageCount(users)).toBe(3);
    expect(validPage(3, users.slice(0, 12))).toBe(2);
  });

  it("creates, updates, and deletes users without mutating the fixture", () => {
    const users = freshUsers();
    const userDraft = draft();
    const created = createUserLogic(users, userDraft);
    const id = created.at(-1)!.id;
    const updated = updateUserLogic(created, id, { ...userDraft, lastName: "Vale", email: "rowan.vale@example.test" });
    const deleted = deleteUserLogic(updated, id);
    expect(created).toHaveLength(18);
    expect(updated.at(-1)?.lastName).toBe("Vale");
    expect(deleted).toHaveLength(17);
    expect(freshUsers()).toEqual(users);
  });

  it("restores fresh fixture copies and parses persisted themes", () => {
    const first = freshUsers();
    first.pop();
    expect(freshUsers()).toHaveLength(17);
    expect(parseTheme("dark")).toBe("dark");
    expect(parseTheme(null, true)).toBe("dark");
    expect(parseTheme("invalid", false)).toBe("light");
  });

  it("retains approximate directory search and reporting-line filters", () => {
    const users = freshUsers();
    expect(searchUsers(users, "Vincus").map(({ firstName }) => firstName)).toEqual([
      "Vinicius",
    ]);
    expect(similarity("Vinicius", "Vincus")).toBeGreaterThan(0.28);
    expect(filterBySuperior(users, 15).map(({ firstName }) => firstName)).toEqual([
      "Vinicius",
    ]);
  });

  it("validates hierarchy and complete optional addresses", () => {
    const users = freshUsers();
    expect(validateUserDraft(draft({ position: "Director", superiorId: 3 }), users)).toBe(
      "Directors cannot report to Managers.",
    );
    expect(
      validateUserDraft(
        draft({ address: { street: "Main", number: "", complement: "", district: "", city: "", state: "", postalCode: "" } }),
        users,
      ),
    ).toBe("Number is required when adding an address.");
    expect(validateUserDraft(draft(), users)).toBeNull();
    expect(validateUserDraft(draft({ superiorId: null }), users)).toBeNull();
  });
});
