import type { Address, Position, User, UserDraft } from "./types";

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

function normalise(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase()
    .trim();
}

export function similarity(left: string, right: string): number {
  const a = normalise(left).replace(/\s+/g, "");
  const b = normalise(right).replace(/\s+/g, "");
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;

  const pairs = new Map<string, number>();
  for (let index = 0; index < a.length - 1; index += 1) {
    const pair = a.slice(index, index + 2);
    pairs.set(pair, (pairs.get(pair) ?? 0) + 1);
  }

  let intersection = 0;
  for (let index = 0; index < b.length - 1; index += 1) {
    const pair = b.slice(index, index + 2);
    const count = pairs.get(pair) ?? 0;
    if (count > 0) {
      pairs.set(pair, count - 1);
      intersection += 1;
    }
  }
  return (2 * intersection) / (a.length + b.length - 2);
}

export function searchUsers(users: readonly User[], query: string): User[] {
  const needle = normalise(query);
  if (!needle) return [...users];
  return users.filter((user) => {
    const name = normalise(`${user.firstName} ${user.lastName}`);
    return (
      name.includes(needle) ||
      normalise(user.email).includes(needle) ||
      normalise(user.department).includes(needle) ||
      similarity(name, needle) > 0.28
    );
  });
}

export function filterBySuperior(
  users: readonly User[],
  superiorId: number | "all",
): User[] {
  return superiorId === "all"
    ? [...users]
    : users.filter((user) => user.superiorId === superiorId);
}

export function validSuperiorPositions(position: Position): Position[] {
  if (position === "Director") return ["Director"];
  if (position === "Manager") return ["Director", "Manager"];
  return ["Director", "Manager", "Consultant"];
}

function addressHasValue(address: Address | null): boolean {
  return Boolean(address && Object.values(address).some((value) => value.trim()));
}

export function validateUserDraft(
  draft: UserDraft,
  users: readonly User[],
  editingId: number | null = null,
): string | null {
  const required = [
    ["First name", draft.firstName],
    ["Last name", draft.lastName],
    ["Email", draft.email],
    ["Login", draft.login],
  ] as const;
  for (const [label, value] of required) {
    if (!value.trim()) return `${label} is required.`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
    return "Enter a valid email address.";
  }
  if (editingId === null && draft.password.length < 8) {
    return "Password must contain at least 8 characters.";
  }
  if (
    users.some(
      (user) =>
        user.id !== editingId &&
        normalise(user.email) === normalise(draft.email),
    )
  ) {
    return "Email address is already in use.";
  }
  if (editingId !== null && draft.superiorId === editingId) {
    return "A person cannot report to themselves.";
  }
  if (draft.superiorId !== null) {
    const superior = users.find(({ id }) => id === draft.superiorId);
    if (!superior) return "Select an available superior.";
    if (!validSuperiorPositions(draft.position).includes(superior.position)) {
      return `${draft.position}s cannot report to ${superior.position}s.`;
    }
  }
  if (addressHasValue(draft.address)) {
    const requiredAddress = [
      ["Street", draft.address?.street],
      ["Number", draft.address?.number],
      ["District", draft.address?.district],
      ["City", draft.address?.city],
      ["State", draft.address?.state],
      ["Postal code", draft.address?.postalCode],
    ] as const;
    for (const [label, value] of requiredAddress) {
      if (!value?.trim()) return `${label} is required when adding an address.`;
    }
  }
  return null;
}

export function createUser(users: readonly User[], draft: UserDraft): User[] {
  const nextId = Math.max(0, ...users.map(({ id }) => id)) + 1;
  const { password: _discardedPassword, ...profile } = draft;
  void _discardedPassword;
  return [...users, { ...profile, id: nextId }];
}

export function updateUser(users: readonly User[], id: number, draft: UserDraft): User[] {
  const { password: _discardedPassword, ...profile } = draft;
  void _discardedPassword;
  return users.map((user) => user.id === id ? { ...user, ...profile } : user);
}

export function deleteUser(users: readonly User[], id: number): User[] {
  const deleted = users.find((user) => user.id === id);
  return users
    .filter((user) => user.id !== id)
    .map((user) =>
      user.superiorId === id
        ? { ...user, superiorId: deleted?.superiorId ?? null }
        : user,
    );
}

export type Theme = "light" | "dark";

export function parseTheme(value: string | null, systemDark = false): Theme {
  return value === "light" || value === "dark" ? value : systemDark ? "dark" : "light";
}
