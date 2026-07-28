import {
  aggregateByOrganisation,
  createEmissionResult,
  initialResults,
  organisations,
} from "@challenge/climateseed-demo/logic";
import { countCharacters, runLengthEncode, updateMembers } from "@challenge/conaz-demo/logic";
import { fullPath, nextMove } from "@challenge/devlandia-demo/logic";
import {
  getLines,
  getStopsForLine,
  getTimesForStop,
  getUniqueStops,
  stops as ingeniousStops,
} from "@challenge/ingenious-build-demo/logic";
import {
  filterLeads,
  getCategoryOptions,
  leads as instructLeads,
} from "@challenge/instruct-demo/logic";
import {
  films as pipzFilms,
  toRomanEpisode,
} from "@challenge/pipz-demo/logic";
import {
  displayedLikes,
  posts as lagoasoftPosts,
  togglePostVote,
} from "@challenge/lagoasoft-demo/logic";
import { convertToRoman } from "@challenge/propertiag-demo/logic";
import {
  createArticle,
  filterArticles,
  initialArticles as swordArticles,
  visibleArticles as visibleSwordArticles,
} from "@challenge/swordhealth-demo/logic";
import { sortBooks, type Book } from "@challenge/zygo-demo/logic";
import { clampPage, getTotalPages, paginate } from "@challenge/vuejs-demo/logic";
import { describe, expect, it } from "vitest";

describe("ClimateSeed demo logic", () => {
  it("aggregates the preserved emissions fixture by organisation", () => {
    const emissions = aggregateByOrganisation(initialResults, organisations);

    expect(emissions.map(({ name, value }) => ({ name, value }))).toEqual([
      { name: "Climateseed", value: 11_866 },
      { name: "Acme Corp", value: 2_306 },
      { name: "Fast Co2", value: 2_916 },
    ]);
    expect(emissions.reduce((sum, { percentage }) => sum + percentage, 0)).toBeCloseTo(100);
  });

  it("validates additions before they enter the dashboard", () => {
    expect(createEmissionResult(2, 5, 450)).toEqual({
      entityId: 2,
      categoryId: 5,
      kco2e: 450,
    });
    expect(() => createEmissionResult(2, 5, 0)).toThrow("greater than zero");
  });
});

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

describe("Sword Health news logic", () => {
  it("filters categories and applies the visible article limit", () => {
    expect(filterArticles(swordArticles, ["Engineering"]).map(({ id }) => id)).toEqual([
      "02",
      "06",
    ]);
    expect(visibleSwordArticles(swordArticles, [], 4)).toHaveLength(4);
  });

  it("validates and creates a locally authored article", () => {
    expect(
      createArticle(
        {
          title: "Care at home",
          description: "A useful summary",
          category: "Medicine",
          content: "A complete local article.",
        },
        "Alex Morgan",
        7,
      ),
    ).toMatchObject({ id: "07", category: "Medicine", author: "Alex Morgan" });

    expect(() =>
      createArticle(
        { title: "", description: "", category: "", content: "" },
        "Alex Morgan",
        7,
      ),
    ).toThrow("Title");
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

describe("Lagoasoft demo voting", () => {
  it("keeps each post vote independent and derives the displayed count", () => {
    const firstVote = togglePostVote({}, 1);
    const secondVote = togglePostVote(firstVote, 2);
    const removedFirstVote = togglePostVote(secondVote, 1);

    expect(secondVote).toEqual({ 1: true, 2: true });
    expect(removedFirstVote).toEqual({ 1: false, 2: true });
    expect(displayedLikes(lagoasoftPosts[0], secondVote[1])).toBe(901);
    expect(displayedLikes(lagoasoftPosts[0], removedFirstVote[1])).toBe(900);
  });
});

describe("Ingenious Build timetable logic", () => {
  it("derives ordered lines, route stops, and departure times from the preserved data", () => {
    expect(getLines(ingeniousStops)).toEqual([100, 101, 102, 103, 105, 106, 107, 109, 110, 111, 112]);
    expect(getStopsForLine(ingeniousStops, 100).map(({ stop }) => stop)).toEqual([
      "Salwator",
      "Malczewskiego",
      "Aleja Waszyngtona",
    ]);

    const times = getTimesForStop(ingeniousStops, 100, "Salwator");
    expect(times[0]).toBe("6:20");
    expect(times.at(-1)).toBe("21:18");
  });

  it("filters and reverses the unique stop directory", () => {
    const ascending = getUniqueStops(ingeniousStops, "salw", "ascending");
    const descending = getUniqueStops(ingeniousStops, "salw", "descending");

    expect(ascending).toContain("Salwator");
    expect(descending).toEqual([...ascending].reverse());
  });
});

describe("Instruct lead filtering", () => {
  it("extracts the individual company categories", () => {
    const options = getCategoryOptions(instructLeads);

    expect(options).toContain("real-time");
    expect(options).toContain("technologies");
    expect(new Set(options).size).toBe(options.length);
  });

  it("combines contact-name and category filters", () => {
    expect(filterLeads(instructLeads, "glenna", ["real-time"])).toHaveLength(1);
    expect(
      filterLeads(instructLeads, "", ["e-enable", "applications"]).map(({ id }) => id),
    ).toEqual([3, 6]);
    expect(filterLeads(instructLeads, "glenna", ["supply-chains"])).toEqual([]);
  });
});

describe("Pipz film archive logic", () => {
  it("formats episode numbers", () => {
    expect(toRomanEpisode(4)).toBe("IV");
  });

  it("retains the historical SWAPI response order", () => {
    expect(pipzFilms.map(({ episodeId }) => episodeId)).toEqual([4, 5, 6, 1, 2, 3, 7]);
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
