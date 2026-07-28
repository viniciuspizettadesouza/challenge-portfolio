import { countCharacters, runLengthEncode, updateMembers } from "@challenge/conaz-demo/logic";
import { fullPath, nextMove } from "@challenge/devlandia-demo/logic";
import { convertToRoman } from "@challenge/propertiag-demo/logic";
import { sortBooks, type Book } from "@challenge/zygo-demo/logic";
import { clampPage, getTotalPages, paginate } from "@challenge/vuejs-demo/logic";
import { describe, expect, it } from "vitest";

describe("Conaz demo logic", () => {
  it("counts characters and encodes repeated runs", () => {
    expect(countCharacters("teste conaz")).toEqual({
      " ": 1,
      a: 1,
      c: 1,
      e: 2,
      n: 1,
      o: 1,
      s: 1,
      t: 2,
      z: 1,
    });
    expect(runLengthEncode("aaaaabbbbccccccaaaaaaa")).toBe("5a4b6c7a");
  });

  it("updates, deactivates, and adds members", () => {
    expect(
      updateMembers(
        [
          { number: 1, active: true, ticket: 10 },
          { number: 2, active: true, ticket: 11 },
        ],
        [
          { number: 1, ticket: 20 },
          { number: 3, ticket: 30 },
        ],
      ),
    ).toEqual([
      { number: 1, active: true, ticket: 20 },
      { number: 2, active: false, ticket: 11 },
      { number: 3, active: true, ticket: 30 },
    ]);
  });
});

describe("PropertiaG Roman numeral conversion", () => {
  it.each([
    [1, "I"],
    [4, "IV"],
    [9, "IX"],
    [42, "XLII"],
    [944, "CMXLIV"],
    [1000, "M"],
  ])("converts %i to %s", (value, expected) => {
    expect(convertToRoman(value)).toBe(expected);
  });

  it.each([0, 1001, 1.5, Number.NaN])("rejects invalid value %s", (value) => {
    expect(() => convertToRoman(value)).toThrow("1 to 1000");
  });
});

describe("Zygo demo logic", () => {
  const books: Book[] = [
    { id: 1, title: "Java How To Program", author: "Deitel & Deitel", edition: 2007 },
    {
      id: 2,
      title: "Patterns of Enterprise Application Architecture",
      author: "Martin Fowler",
      edition: 2002,
    },
    {
      id: 3,
      title: "Head First Design Patterns",
      author: "Elisabeth Freeman",
      edition: 2004,
    },
    {
      id: 4,
      title: "Internet & World Wide Web: How to Program",
      author: "Deitel & Deitel",
      edition: 2007,
    },
  ];

  it("reproduces all expected book orderings", () => {
    expect(sortBooks(books, "title-ascending").map(({ id }) => id)).toEqual([3, 4, 1, 2]);
    expect(
      sortBooks(books, "author-ascending-title-descending").map(({ id }) => id),
    ).toEqual([1, 4, 3, 2]);
    expect(
      sortBooks(books, "edition-descending-author-descending-title-ascending").map(
        ({ id }) => id,
      ),
    ).toEqual([4, 1, 3, 2]);
  });
});

describe("Devlandia demo logic", () => {
  const grid = `-----
-----
p--m-
-----
-----`;

  it("returns the full path and next move", () => {
    expect(fullPath(grid)).toEqual(["LEFT", "LEFT", "LEFT"]);
    expect(nextMove(grid)).toBe("LEFT");
  });

  it("rejects malformed grids", () => {
    expect(() => fullPath("--\n-m\np-")).toThrow("square");
  });
});

describe("Vue.js demo pagination", () => {
  const items = Array.from({ length: 12 }, (_, index) => index + 1);

  it("calculates pages and returns the requested slice", () => {
    expect(getTotalPages(items.length, 5)).toBe(3);
    expect(paginate(items, 2, 5)).toEqual([6, 7, 8, 9, 10]);
  });

  it("keeps page selection within range", () => {
    expect(clampPage(0, items.length, 5)).toBe(1);
    expect(clampPage(8, items.length, 5)).toBe(3);
  });
});
