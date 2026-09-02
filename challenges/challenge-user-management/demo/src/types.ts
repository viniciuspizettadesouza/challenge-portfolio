export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface UserDraft {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Session {
  token: string;
  user: User;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
