import {
  aggregateByOrganisation,
  createEmissionResult,
  initialResults,
  organisations,
} from "@challenge/climateseed-demo/logic";
import {
  addSearchHistory,
  comparisonHours,
  distanceInKilometers,
  findForecast,
  forecasts as weatherForecasts,
  nearestForecast,
} from "@challenge/weather-forecast-demo/logic";
import {
  readWeatherState,
  WEATHER_STORAGE_KEY,
  writeWeatherState,
} from "@challenge/weather-forecast-demo/persistence";
import {
  clampPage,
  createEpisode,
  deleteEpisode,
  episodes as televisionEpisodes,
  filterEpisodes,
  films as libraryFilms,
  getShow,
  getTotalPages,
  movies as libraryMovies,
  paginate,
  searchEpisodes,
  searchMovies,
  toRomanEpisode,
} from "@challenge/screen-library-demo/logic";
import {
  countCharacters,
  convertToRoman,
  fullPath,
  nextMove,
  runLengthEncode,
  updateMembers,
} from "@challenge/algorithm-playground-demo/logic";
import {
  getLines,
  getStopsForLine,
  getTimesForStop,
  getUniqueStops,
  stops as ingeniousStops,
} from "@challenge/ingenious-build-demo/logic";
import { initialLeads } from "@challenge/lead-operations-demo/fixtures";
import { createLead, deleteLead, filterLeads, getCategoryOptions, nextLeadId, updateLead, validateLead } from "@challenge/lead-operations-demo/logic";
import { LEAD_STORAGE_KEY, loadLeads, migrateLegacyLeads, readLeadState, writeLeadState } from "@challenge/lead-operations-demo/persistence";
import {
  displayedLikes,
  posts as lagoasoftPosts,
  togglePostVote,
} from "@challenge/lagoasoft-demo/logic";
import {
  createArticle,
  filterArticles,
  initialArticles as swordArticles,
  visibleArticles as visibleSwordArticles,
} from "@challenge/swordhealth-demo/logic";
import {
  BookSortingError,
  books as sortingBooks,
  createBookComparator,
  presets as sortingPresets,
  sortBooks as sortConfiguredBooks,
  type BookField,
} from "@challenge/configurable-book-sorting-demo/logic";
import {
  filterStrains,
  findStrain,
  paginateStrains,
  strains,
} from "@challenge/strains-demo/logic";
import { describe, expect, it } from "vitest";

describe("3cket local event fixture", () => {
  it("searches across name, category, and location", () => {
    expect(filterEvents(threeCketEvents, "festival")).toHaveLength(3);
    expect(filterEvents(threeCketEvents, "Barcelona")).toHaveLength(2);
    expect(filterEvents(threeCketEvents, "Evo Padel")[0]?.slug).toBe(
      "evo-padel-open",
    );
  });

  it("models detail lookup, not-found, and price presentation", () => {
    expect(findEvent("festival-f")?.name).toBe("Festival F");
    expect(findEvent("missing-event")).toBeUndefined();
    expect(formatEventPrice(findEvent("timeout-barcelona")!)).toBe("Free");
    expect(formatEventPrice(findEvent("tamariz-summer-fest")!)).toBe("€75");
  });
});

describe("Leafwell local strain directory", () => {
  it("combines name, initial, and type filters", () => {
    expect(
      filterStrains(strains, { query: "", initial: "B", type: "All" }).map(
        ({ slug }) => slug,
      ),
    ).toEqual(["blue-dream"]);
    expect(
      filterStrains(strains, { query: "purple", initial: "", type: "Indica" }),
    ).toHaveLength(2);
    expect(
      filterStrains(strains, { query: "", initial: "", type: "Sativa" }),
    ).toHaveLength(4);
  });

  it("paginates records and resolves a detail slug", () => {
    expect(paginateStrains(strains, 2).items).toHaveLength(6);
    expect(paginateStrains(strains, 99).currentPage).toBe(2);
    expect(findStrain("northern-lights")?.type).toBe("Indica");
  });
});

describe("configurable book sorting", () => {
  it("reproduces the three documented compound configurations", () => {
    expect(
      sortConfiguredBooks(sortingBooks, sortingPresets.title).map(
        ({ id }) => id,
      ),
    ).toEqual([3, 4, 1, 2]);
    expect(
      sortConfiguredBooks(sortingBooks, sortingPresets.authorTitle).map(
        ({ id }) => id,
      ),
    ).toEqual([1, 4, 3, 2]);
    expect(
      sortConfiguredBooks(sortingBooks, sortingPresets.editionAuthorTitle).map(
        ({ id }) => id,
      ),
    ).toEqual([4, 1, 3, 2]);
  });

  it("supports arbitrary configuration without mutating its input", () => {
    const input = [...sortingBooks];
    const result = sortConfiguredBooks(input, [
      { field: "title", direction: "descending" },
    ]);
    expect(result[0].id).toBe(2);
    expect(input).toEqual(sortingBooks);
    expect(
      createBookComparator([{ field: "editionYear", direction: "ascending" }])(
        sortingBooks[0],
        sortingBooks[1],
      ),
    ).toBeGreaterThan(0);
  });

  it("reports null, empty, and invalid configurations explicitly", () => {
    expect(() => sortConfiguredBooks(null, sortingPresets.title)).toThrow(
      BookSortingError,
    );
    expect(sortConfiguredBooks([], sortingPresets.title)).toEqual([]);
    expect(() => sortConfiguredBooks(sortingBooks, [])).toThrow("unique field");
    expect(() =>
      sortConfiguredBooks(sortingBooks, [
        sortingPresets.title[0],
        sortingPresets.title[0],
      ]),
    ).toThrow("unique field");
    expect(() =>
      sortConfiguredBooks(sortingBooks, [
        { field: "isbn" as BookField, direction: "ascending" },
      ]),
    ).toThrow("unique field");
  });
});

describe("consolidated lead operations", () => {
  it("retains thirteen records and combines contact, company, and category filters", () => {
    expect(initialLeads).toHaveLength(13);
    expect(new Set(initialLeads.map(({ id }) => id)).size).toBe(13);
    expect(filterLeads(initialLeads, "Glenna", [])).toHaveLength(1);
    expect(filterLeads(initialLeads, "Northstar", ["enterprise"])).toHaveLength(1);
    expect(filterLeads(initialLeads, "", ["e-enable", "applications"]).map(({ id }) => id)).toEqual(["instruct-3", "instruct-6"]);
    expect(getCategoryOptions(initialLeads)).toContain("real-time");
  });

  it("validates and creates leads for a local cadence", () => {
    const draft = {
      name: "Alex Morgan",
      email: "alex@example.com",
      phone: "+44 20 7000 0000",
      company: "Example Labs",
      categories: ["saas"],
      cadence: "Product Demo",
    };

    expect(validateLead(draft)).toEqual({});
    expect(createLead(draft, nextLeadId(initialLeads), "06 Sep 2026")).toMatchObject({
      id: "local-1",
      name: "Alex Morgan",
      cadence: "Product Demo",
    });
    expect(validateLead({ ...draft, email: "invalid" }).email).toContain(
      "valid",
    );
  });

  it("updates and deletes leads without mutating the preserved fixture", () => {
    const updated = { ...initialLeads[0], phone: "+55 48 90000-0000" };
    const next = updateLead(initialLeads, updated);

    expect(next[0].phone).toBe("+55 48 90000-0000");
    expect(initialLeads[0].phone).not.toBe(next[0].phone);
    expect(deleteLead(next, updated.id)).toHaveLength(initialLeads.length - 1);
  });

  it("validates versioned persistence and imports authoritative legacy state", () => {
    const values = new Map<string, string>();
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) };
    expect(writeLeadState(storage, initialLeads)).toBe(true);
    expect(readLeadState(storage)?.leads).toHaveLength(13);
    values.set(LEAD_STORAGE_KEY, "bad json");
    expect(readLeadState(storage)).toBeUndefined();
    const legacy = migrateLegacyLeads([{ leadName: "Daniel Updated", email: "daniel@example.com", phone: "123", cadence: "Enterprise Follow-up", createdAt: "27 Jul 2026" }, { leadName: "New Lead", email: "new@example.com", phone: "456", cadence: "Outbound SMB" }]);
    expect(legacy).toHaveLength(12);
    expect(legacy?.find(({ email }) => email === "daniel@example.com")?.name).toBe("Daniel Updated");
    expect(legacy?.find(({ email }) => email === "new@example.com")?.company).toBe("Independent prospect");
    expect(migrateLegacyLeads(null)).toBeUndefined();
    expect(migrateLegacyLeads([{ email: "duplicate@example.com", phone: "1", cadence: "Product Demo" }, { email: "DUPLICATE@example.com", phone: "2", cadence: "Outbound SMB" }, { invalid: true }])).toHaveLength(11);
    values.delete(LEAD_STORAGE_KEY);
    values.set("meetime-demo-leads", JSON.stringify([{ leadName: "Only Legacy", email: "only@example.com", phone: "789", cadence: "Product Demo" }]));
    expect(loadLeads(storage).source).toBe("migrated");
    expect(readLeadState(undefined)).toBeUndefined();
    expect(writeLeadState(undefined, initialLeads)).toBe(false);
    expect(writeLeadState({ getItem: () => null, setItem: () => { throw new Error("blocked"); } }, initialLeads)).toBe(false);
  });
});

describe("consolidated local weather forecast", () => {
  it("finds city fixtures and selects the closest available forecast", () => {
    expect(findForecast("lisbon")?.country).toBe("Portugal");
    expect(findForecast("united kingdom")?.city).toBe("London");
    expect(findForecast("10 Downing Street, London")?.city).toBe("London");
    expect(findForecast("sao paulo")?.city).toBe("São Paulo");
    expect(nearestForecast(-27.6, -48.55).city).toBe("Florianópolis");
    expect(
      distanceInKilometers(38.7223, -9.1393, 51.5072, -0.1276),
    ).toBeGreaterThan(1500);
  });

  it("maintains a unique, most-recent-first search history", () => {
    const london = findForecast("London")!;
    expect(
      addSearchHistory(["London, England, United Kingdom", "Lisbon"], london),
    ).toEqual(["London, England, United Kingdom", "Lisbon"]);
  });

  it("retains both six-hour and 48-hour views", () => {
    expect(weatherForecasts).toHaveLength(4);
    expect(weatherForecasts.every(({ hours }) => hours.length === 48)).toBe(
      true,
    );
    expect(comparisonHours(weatherForecasts[0].hours)).toHaveLength(6);
  });

  it("validates versioned browser state and tolerates unavailable storage", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    };
    expect(
      writeWeatherState(storage, {
        version: 1,
        selectedId: "lisbon",
        history: ["Lisbon"],
      }),
    ).toBe(true);
    expect(readWeatherState(storage)).toEqual({
      version: 1,
      selectedId: "lisbon",
      history: ["Lisbon"],
    });
    values.set(WEATHER_STORAGE_KEY, "not json");
    expect(readWeatherState(storage)).toBeUndefined();
    expect(readWeatherState(undefined)).toBeUndefined();
    expect(
      writeWeatherState(undefined, {
        version: 1,
        selectedId: "lisbon",
        history: [],
      }),
    ).toBe(false);
  });
});

describe("consolidated TV episode library", () => {
  it("searches and filters episodes across both source projects", () => {
    expect(
      searchEpisodes(televisionEpisodes, "quiet").map(({ id }) => id),
    ).toEqual(["episode-01"]);
    expect(searchEpisodes(televisionEpisodes, "northbound")).toHaveLength(2);
    expect(filterEpisodes(televisionEpisodes, "", "signal-lost")).toHaveLength(12);
    expect(getShow("signal-lost")?.rating).toBe(8.4);
  });

  it("creates and deletes local episodes", () => {
    const episode = createEpisode(
      {
        showId: "signal-division",
        title: "First Light",
        description: "The station wakes.",
        seasonNumber: 1,
        episodeNumber: 1,
        releaseDate: "2026-07-28",
        runtime: 44,
        imdbId: "tt1234567",
      },
      6,
    );

    expect(episode).toMatchObject({ id: "local-6", title: "First Light" });
    expect(
      deleteEpisode([...televisionEpisodes, episode], episode.id),
    ).toHaveLength(televisionEpisodes.length);
    expect(() =>
      createEpisode(
        {
          showId: "",
          title: "First Light",
          description: "The station wakes.",
          seasonNumber: 1,
          episodeNumber: 1,
          releaseDate: "2026-07-28",
          runtime: 44,
          imdbId: "tt1234567",
        },
        7,
      ),
    ).toThrow("series");
  });
});

describe("ClimateSeed demo logic", () => {
  it("aggregates the preserved emissions fixture by organisation", () => {
    const emissions = aggregateByOrganisation(initialResults, organisations);

    expect(emissions.map(({ name, value }) => ({ name, value }))).toEqual([
      { name: "Climateseed", value: 11_866 },
      { name: "Acme Corp", value: 2_306 },
      { name: "Fast Co2", value: 2_916 },
    ]);
    expect(
      emissions.reduce((sum, { percentage }) => sum + percentage, 0),
    ).toBeCloseTo(100);
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

describe("consolidated Algorithm Playground logic", () => {
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

describe("Algorithm Playground Roman numeral conversion", () => {
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
    expect(
      filterArticles(swordArticles, ["Engineering"]).map(({ id }) => id),
    ).toEqual(["02", "06"]);
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

describe("Algorithm Playground pathfinding", () => {
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

describe("consolidated Film Library logic", () => {
  it("requires three characters and filters titles case-insensitively", () => {
    expect(searchMovies(libraryMovies, "av")).toEqual([]);
    expect(searchMovies(libraryMovies, "INFINITY").map(({ id }) => id)).toEqual([
      299536,
    ]);
    expect(searchMovies(libraryMovies, "avengers")).toHaveLength(8);
  });

  it("retains the historical SWAPI response order and Roman episodes", () => {
    expect(toRomanEpisode(4)).toBe("IV");
    expect(libraryFilms.map(({ episodeId }) => episodeId)).toEqual([
      4, 5, 6, 1, 2, 3, 7,
    ]);
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
    expect(getLines(ingeniousStops)).toEqual([
      100, 101, 102, 103, 105, 106, 107, 109, 110, 111, 112,
    ]);
    expect(
      getStopsForLine(ingeniousStops, 100).map(({ stop }) => stop),
    ).toEqual(["Salwator", "Malczewskiego", "Aleja Waszyngtona"]);

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

describe("TV episode library pagination", () => {
  it("calculates pages and returns the requested slice", () => {
    expect(televisionEpisodes).toHaveLength(17);
    expect(getTotalPages(televisionEpisodes.length, 5)).toBe(4);
    expect(paginate(televisionEpisodes, 2, 5)).toHaveLength(5);
  });

  it("keeps page selection within range", () => {
    expect(clampPage(0, televisionEpisodes.length, 5)).toBe(1);
    expect(clampPage(8, televisionEpisodes.length, 5)).toBe(4);
  });
});
import {
  events as threeCketEvents,
  filterEvents,
  findEvent,
  formatEventPrice,
} from "@challenge/3cket-demo/logic";
