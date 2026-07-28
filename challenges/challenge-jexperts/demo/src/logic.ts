export interface Address {
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  telephone: string;
  position: string;
  login: string;
  cpf: string;
  superior: string;
  address: Address;
}

export interface ProfileDraft extends Omit<User, "id" | "address"> {
  password: string;
}

export const initialUsers: User[] = [
  {
    id: 1,
    name: "Adriano Lima",
    email: "adriano@example.com",
    telephone: "+55 11 98888-1200",
    position: "Director",
    login: "adriano",
    cpf: "123.456.789-00",
    superior: "Board",
    address: {
      street: "Avenida Paulista",
      number: "1000",
      complement: "Floor 8",
      district: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      cep: "01310-100",
    },
  },
  {
    id: 2,
    name: "Vinicius Souza",
    email: "vinicius@example.com",
    telephone: "+55 48 97777-2400",
    position: "Consultant",
    login: "vini",
    cpf: "987.654.321-00",
    superior: "Adriano Lima",
    address: {
      street: "Rua das Flores",
      number: "42",
      complement: "",
      district: "Centro",
      city: "Florianópolis",
      state: "SC",
      cep: "88010-200",
    },
  },
  {
    id: 3,
    name: "Camila Nunes",
    email: "camila@example.com",
    telephone: "+55 21 96666-3600",
    position: "Software Engineer",
    login: "camila",
    cpf: "246.813.579-00",
    superior: "Vinicius Souza",
    address: {
      street: "Rua do Mercado",
      number: "18",
      complement: "Apartment 302",
      district: "Centro",
      city: "Rio de Janeiro",
      state: "RJ",
      cep: "20010-120",
    },
  },
];

function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase()
    .trim();
}

export function similarity(left: string, right: string) {
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

export function searchUsers(users: User[], query: string) {
  const normalisedQuery = normalise(query);
  if (!normalisedQuery) return users;

  return users.filter(({ name }) => {
    const normalisedName = normalise(name);
    return (
      normalisedName.includes(normalisedQuery) ||
      similarity(normalisedName, normalisedQuery) > 0.28
    );
  });
}

export function validateProfile(profile: ProfileDraft) {
  const required = [
    ["Name", profile.name],
    ["E-mail", profile.email],
    ["Position", profile.position],
    ["Login", profile.login],
    ["Password", profile.password],
    ["CPF", profile.cpf],
  ] as const;

  for (const [label, value] of required) {
    if (!value.trim()) return `${label} is required.`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) {
    return "Enter a valid e-mail.";
  }
  return "";
}

export function validateAddress(address: Address) {
  const required = [
    ["Street", address.street],
    ["Number", address.number],
    ["District", address.district],
    ["City", address.city],
    ["State", address.state],
    ["CEP", address.cep],
  ] as const;

  for (const [label, value] of required) {
    if (!value.trim()) return `${label} is required.`;
  }
  return "";
}

export function createUser(
  profile: ProfileDraft,
  address: Address,
  id: number,
): User {
  const error = validateProfile(profile) || validateAddress(address);
  if (error) throw new Error(error);

  const { password: _discardedPassword, ...safeProfile } = profile;
  void _discardedPassword;

  return {
    ...safeProfile,
    id,
    name: safeProfile.name.trim(),
    email: safeProfile.email.trim().toLocaleLowerCase(),
    login: safeProfile.login.trim().toLocaleLowerCase(),
    address: Object.fromEntries(
      Object.entries(address).map(([key, value]) => [key, value.trim()]),
    ) as unknown as Address,
  };
}
