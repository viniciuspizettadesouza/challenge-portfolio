import CityExplorerDemo from "@challenge/city-explorer-demo";
import WeatherForecastDemo from "@challenge/weather-forecast-demo";
import ScreenLibraryDemo from "@challenge/screen-library-demo";
import ClimateSeedDemo from "@challenge/climateseed-demo";
import LeadOperationsDemo from "@challenge/lead-operations-demo";
import PeopleOperationsDemo from "@challenge/people-operations-demo";
import LagoasoftDemo from "@challenge/lagoasoft-demo";
import SalsifyDemo from "@challenge/salsify-demo";
import ConfigurableBookSortingDemo from "@challenge/configurable-book-sorting-demo";
import StrainsDemo from "@challenge/strains-demo";
import SwordHealthDemo from "@challenge/swordhealth-demo";
import VueDemo from "@challenge/vue-demo";
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
    expect(html).toContain("data-theme=\"light\"");
  });

  it("renders configurable book sorting", () => {
    const html = renderToStaticMarkup(
      createElement(ConfigurableBookSortingDemo),
    );

    expect(html).toContain("Configurable book sorting");
    expect(html).toContain("Comparator pipeline");
    expect(html).toContain("Java How To Program");
    expect(html).toContain("Configuration presets");
  });

  it("renders the consolidated lead operations workspace", async () => {
    const html = await renderToString(createSSRApp(LeadOperationsDemo));

    expect(html).toContain("Lead Operations");
    expect(html).toContain("Leanne Graham");
    expect(html).toContain("Mariana Costa");
    expect(html).toContain("Search contact or company");
  });

  it("renders the consolidated local weather explorer", async () => {
    const html = await renderToString(createSSRApp(WeatherForecastDemo));

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

  it("renders the safe Sword Health news platform", async () => {
    const html = await renderToString(createSSRApp(SwordHealthDemo));

    expect(html).toContain("Clinical insight for a world without pain");
    expect(html).toContain("Start demo session");
    expect(html).toContain("News &amp; perspectives");
  });

  it("renders the Lagoasoft social feed", () => {
    const html = renderToStaticMarkup(createElement(LagoasoftDemo));

    expect(html).toContain("A local social feed with independent likes");
    expect(html).toContain("Need a job?");
    expect(html).toContain("Mobile developer role");
  });

  it("renders the fixture-backed ClimateSeed dashboard", async () => {
    const html = await renderToString(createSSRApp(ClimateSeedDemo));

    expect(html).toContain("Organisation emissions overview");
    expect(html).toContain("Climateseed");
    expect(html).toContain("Add an emissions result");
  });

  it("renders the Salsify product table", () => {
    const html = renderToStaticMarkup(createElement(SalsifyDemo));

    expect(html).toContain("Salsify Product Table");
    expect(html).toContain("<table");
  });

  it("renders the Vue driver selector", async () => {
    const html = await renderToString(createSSRApp(VueDemo));

    expect(html).toContain("Formula 1 Top Drivers");
    expect(html).toContain("Max Verstappen");
  });

});
