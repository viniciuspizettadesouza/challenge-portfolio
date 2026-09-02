import type { User } from "./types";

export const fixtureUsers: readonly User[] = [
  { id: 1, firstName: "Janet", lastName: "Weaver", email: "janet.weaver@example.test", role: "Administrator" },
  { id: 2, firstName: "Mateo", lastName: "Silva", email: "mateo.silva@example.test", role: "Product" },
  { id: 3, firstName: "Aisha", lastName: "Rahman", email: "aisha.rahman@example.test", role: "Engineering" },
  { id: 4, firstName: "Noah", lastName: "Martin", email: "noah.martin@example.test", role: "Support" },
  { id: 5, firstName: "Sofia", lastName: "Costa", email: "sofia.costa@example.test", role: "Design" },
  { id: 6, firstName: "Elias", lastName: "Berg", email: "elias.berg@example.test", role: "Operations" },
  { id: 7, firstName: "Mina", lastName: "Park", email: "mina.park@example.test", role: "Finance" },
  { id: 8, firstName: "Leo", lastName: "Dubois", email: "leo.dubois@example.test", role: "Engineering" },
  { id: 9, firstName: "Amara", lastName: "Okafor", email: "amara.okafor@example.test", role: "Research" },
  { id: 10, firstName: "Theo", lastName: "Wilson", email: "theo.wilson@example.test", role: "Support" },
  { id: 11, firstName: "Ines", lastName: "Rossi", email: "ines.rossi@example.test", role: "Marketing" },
  { id: 12, firstName: "Omar", lastName: "Haddad", email: "omar.haddad@example.test", role: "Sales" },
  { id: 13, firstName: "Nora", lastName: "Jensen", email: "nora.jensen@example.test", role: "Legal" },
  { id: 14, firstName: "Kai", lastName: "Tan", email: "kai.tan@example.test", role: "Engineering" },
];

export function freshUsers(): User[] {
  return fixtureUsers.map((user) => ({ ...user }));
}
