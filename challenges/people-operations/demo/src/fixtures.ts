import type { Address, Position, User } from "./types";

const noAddress: Address | null = null;

function person(
  id: number,
  firstName: string,
  lastName: string,
  department: string,
  position: Position,
  superiorId: number | null,
  extras: Partial<User> = {},
): User {
  return {
    id,
    firstName,
    lastName,
    email: `${firstName}.${lastName}@example.test`.toLocaleLowerCase(),
    telephone: `+351 21 555 ${String(1000 + id).slice(-4)}`,
    position,
    department,
    login: `${firstName[0]}${lastName}`.toLocaleLowerCase(),
    cpf: `000.000.${String(100 + id).padStart(3, "0")}-00`,
    superiorId,
    address: noAddress,
    ...extras,
  };
}

export const fixtureUsers: readonly User[] = [
  person(1, "Janet", "Weaver", "Administration", "Director", null, {
    email: "janet.weaver@example.test",
  }),
  person(2, "Mateo", "Silva", "Product", "Manager", 1),
  person(3, "Aisha", "Rahman", "Engineering", "Manager", 1),
  person(4, "Noah", "Martin", "Support", "Consultant", 2),
  person(5, "Sofia", "Costa", "Design", "Consultant", 2),
  person(6, "Elias", "Berg", "Operations", "Manager", 1),
  person(7, "Mina", "Park", "Finance", "Consultant", 6),
  person(8, "Leo", "Dubois", "Engineering", "Consultant", 3),
  person(9, "Amara", "Okafor", "Research", "Consultant", 3),
  person(10, "Theo", "Wilson", "Support", "Consultant", 2),
  person(11, "Ines", "Rossi", "Marketing", "Manager", 1),
  person(12, "Omar", "Haddad", "Sales", "Consultant", 11),
  person(13, "Nora", "Jensen", "Legal", "Consultant", 6),
  person(14, "Kai", "Tan", "Engineering", "Consultant", 3),
  person(15, "Adriano", "Lima", "Executive", "Director", 1, {
    email: "adriano@example.com",
    telephone: "+55 11 98888-1200",
    login: "adriano",
    cpf: "123.456.789-00",
    address: {
      street: "Avenida Paulista",
      number: "1000",
      complement: "Floor 8",
      district: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      postalCode: "01310-100",
    },
  }),
  person(16, "Vinicius", "Souza", "Consulting", "Consultant", 15, {
    email: "vinicius@example.com",
    telephone: "+55 48 97777-2400",
    login: "vini",
    cpf: "987.654.321-00",
    address: {
      street: "Rua das Flores",
      number: "42",
      complement: "",
      district: "Centro",
      city: "Florianópolis",
      state: "SC",
      postalCode: "88010-200",
    },
  }),
  person(17, "Camila", "Nunes", "Engineering", "Consultant", 16, {
    email: "camila@example.com",
    telephone: "+55 21 96666-3600",
    login: "camila",
    cpf: "246.813.579-00",
    address: {
      street: "Rua do Mercado",
      number: "18",
      complement: "Apartment 302",
      district: "Centro",
      city: "Rio de Janeiro",
      state: "RJ",
      postalCode: "20010-120",
    },
  }),
];

export function freshUsers(): User[] {
  return fixtureUsers.map((user) => ({
    ...user,
    address: user.address ? { ...user.address } : null,
  }));
}
