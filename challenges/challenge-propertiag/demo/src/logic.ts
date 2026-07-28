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
