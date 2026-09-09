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

const romanNumerals = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
] as const;

export function convertToRoman(value: number) {
  if (!Number.isInteger(value) || value < 1 || value > 1000) {
    throw new RangeError("Enter a whole number from 1 to 1000.");
  }

  let remaining = value;
  let result = "";

  for (const [number, numeral] of romanNumerals) {
    while (remaining >= number) {
      result += numeral;
      remaining -= number;
    }
  }

  return result;
}

function parseGrid(value: string) {
  const rows = value.trim().split("\n").map((row) => [...row.trim()]);
  if (rows.length < 2 || rows.some((row) => row.length !== rows.length)) {
    throw new Error("Grid must be square.");
  }

  const find = (target: string) => {
    for (let row = 0; row < rows.length; row += 1) {
      const column = rows[row].indexOf(target);
      if (column >= 0) return { row, column };
    }
    throw new Error(`Grid must contain ${target}.`);
  };

  return { bot: find("m"), princess: find("p") };
}

export function fullPath(value: string) {
  const { bot, princess } = parseGrid(value);
  const moves: string[] = [];
  const vertical = princess.row < bot.row ? "UP" : "DOWN";
  const horizontal = princess.column < bot.column ? "LEFT" : "RIGHT";

  for (let row = bot.row; row !== princess.row; row += princess.row < row ? -1 : 1) {
    moves.push(vertical);
  }
  for (
    let column = bot.column;
    column !== princess.column;
    column += princess.column < column ? -1 : 1
  ) {
    moves.push(horizontal);
  }

  return moves;
}

export function nextMove(value: string) {
  return fullPath(value)[0];
}
