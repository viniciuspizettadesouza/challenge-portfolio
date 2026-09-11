import CityExplorerDemo from "@challenge/city-explorer-demo";
import ClimateWorkspaceDemo from "@challenge/climate-workspace-demo";
import ScreenLibraryDemo from "@challenge/screen-library-demo";
import ContentPlatformDemo from "@challenge/content-platform-demo";
import LeadOperationsDemo from "@challenge/lead-operations-demo";
import PeopleOperationsDemo from "@challenge/people-operations-demo";
import StructuredDataWorkbenchDemo from "@challenge/structured-data-workbench-demo";
import StrainsDemo from "@challenge/strains-demo";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { describe, expect, it } from "vitest";

describe("pilot demos", () => {
  it("renders the consolidated City Explorer", async () => {
    const html = await renderToString(createSSRApp(CityExplorerDemo));

    expect(html).toContain("City Explorer");
    expect(html).toContain("Events");
    expect(html).toContain("Transit");
    expect(html).toContain("Find your next event.");
    expect(html).toContain("Evo Padel Open");
    expect(html).toContain("Preview dynamic slug");
  });

  it("renders the local Leafwell strain directory", () => {
    const html = renderToStaticMarkup(createElement(StrainsDemo));

    expect(html).toContain("Find a strain");
    expect(html).toContain("Acapulco Gold");
    expect(html).toContain("12 directory records");
  });

  it("renders the consolidated people operations workspace", () => {
    const html = renderToStaticMarkup(createElement(PeopleOperationsDemo));

    expect(html).toContain("Loading people operations");
    expect(html).toContain('data-theme="light"');
  });

  it("renders the consolidated Structured Data Workbench", () => {
    const html = renderToStaticMarkup(
      createElement(StructuredDataWorkbenchDemo),
    );

    expect(html).toContain("Structured Data Workbench");
    expect(html).toContain("Product filtering");
    expect(html).toContain("Book sorting");
    expect(html).toContain("Driver selection");
    expect(html).toContain("Salsify Product Table");
    expect(html).toContain("<table");
  });

  it("renders the consolidated lead operations workspace", async () => {
    const html = await renderToString(createSSRApp(LeadOperationsDemo));

    expect(html).toContain("Lead Operations");
    expect(html).toContain("Leanne Graham");
    expect(html).toContain("Mariana Costa");
    expect(html).toContain("Search contact or company");
  });

  it("renders the consolidated climate workspace", () => {
    const html = renderToStaticMarkup(createElement(ClimateWorkspaceDemo));

    expect(html).toContain("Climate &amp; Weather Workspace");
    expect(html).toContain("Forecasts");
    expect(html).toContain("Emissions");
    expect(html).toContain("Forecast explorer");
    expect(html).toContain("Florianópolis");
    expect(html).toContain("Next six hours");
    expect(html).toContain("48-hour forecast");
  });

  it("renders the consolidated Screen Library television collection", () => {
    const html = renderToStaticMarkup(createElement(ScreenLibraryDemo));

    expect(html).toContain("Screen Library");
    expect(html).toContain("TV shows");
    expect(html).toContain("Films");
    expect(html).toContain("TV Episode Library");
    expect(html).toContain("Local subscription simulation");
    expect(html).toContain("Signal Lost");
    expect(html).toContain("17 matching episodes");
    expect(html).toContain("Page 1 of 4");
  });

  it("renders the consolidated Content Platform", async () => {
    const html = await renderToString(createSSRApp(ContentPlatformDemo));

    expect(html).toContain("Content Platform");
    expect(html).toContain("News");
    expect(html).toContain("Social feed");
    expect(html).toContain("Clinical insight for a world without pain");
    expect(html).toContain("Start demo session");
    expect(html).toContain("News &amp; perspectives");
  });
});
