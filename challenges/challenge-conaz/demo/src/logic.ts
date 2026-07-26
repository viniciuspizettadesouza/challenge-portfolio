export interface Member {
  number: number;
  active: boolean;
  ticket: number;
}

export interface IncomingMember {
  number: number;
  ticket: number;
}

export function countCharacters(value: string) {
  return [...value].sort().reduce<Record<string, number>>((counts, character) => {
    counts[character] = (counts[character] ?? 0) + 1;
    return counts;
  }, {});
}

export function runLengthEncode(value: string) {
  if (!value) return "";

  let encoded = "";
  let current = value[0];
  let count = 0;

  for (const character of value) {
    if (character === current) {
      count += 1;
    } else {
      encoded += `${count}${current}`;
      current = character;
      count = 1;
    }
  }

  return `${encoded}${count}${current}`;
}

export function updateMembers(current: Member[], incoming: IncomingMember[]): Member[] {
  const incomingByNumber = new Map(incoming.map((member) => [member.number, member]));
  const updated = current.map((member) => {
    const replacement = incomingByNumber.get(member.number);
    incomingByNumber.delete(member.number);

    return replacement
      ? { number: member.number, active: true, ticket: replacement.ticket }
      : { ...member, active: false };
  });

  return [
    ...updated,
    ...[...incomingByNumber.values()].map((member) => ({ ...member, active: true })),
  ];
}
