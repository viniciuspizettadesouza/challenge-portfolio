export type Position = "Director" | "Manager" | "Consultant";

export interface Address {
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  position: Position;
  department: string;
  login: string;
  cpf: string;
  superiorId: number | null;
  address: Address | null;
}

export interface UserDraft extends Omit<User, "id"> {
  password: string;
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
