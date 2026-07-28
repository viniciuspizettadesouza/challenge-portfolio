import ClimateSeedDemo from "@challenge/climateseed-demo";
import FyldHansecomDemo from "@challenge/fyld-hansecom-demo";
import IngeniousBuildDemo from "@challenge/ingenious-build-demo";
import InstructDemo from "@challenge/instruct-demo";
import LagoasoftDemo from "@challenge/lagoasoft-demo";
import PipzDemo from "@challenge/pipz-demo";
import PropertiaGDemo from "@challenge/propertiag-demo";
import SalsifyDemo from "@challenge/salsify-demo";
import SwordHealthDemo from "@challenge/swordhealth-demo";
import VueDemo from "@challenge/vue-demo";
import VueJsDemo from "@challenge/vuejs-demo";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { describe, expect, it } from "vitest";

describe("pilot demos", () => {
  it("renders the Fyld Hansecom movie search", async () => {
    const html = await renderToString(createSSRApp(FyldHansecomDemo));

    expect(html).toContain("Search for any movie");
    expect(html).toContain("Search movie");
    expect(html).toContain("The preserved “avengers” query is ready to run.");
  });

  it("renders the local Pipz film archive", () => {
    const html = renderToStaticMarkup(createElement(PipzDemo));

    expect(html).toContain("A long time ago in a galaxy far, far away");
    expect(html).toContain("The Phantom Menace");
    expect(html).toContain("The Force Awakens");
  });

  it("renders the safe Sword Health news platform", async () => {
    const html = await renderToString(createSSRApp(SwordHealthDemo));

    expect(html).toContain("Clinical insight for a world without pain");
    expect(html).toContain("Start demo session");
    expect(html).toContain("News &amp; perspectives");
  });

  it("renders the fixture-backed Instruct leads table", async () => {
    const html = await renderToString(createSSRApp(InstructDemo));

    expect(html).toContain("Potential customers");
    expect(html).toContain("Leanne Graham");
    expect(html).toContain("Glenna Reichert");
  });

  it("renders the Ingenious Build timetable", async () => {
    const html = await renderToString(createSSRApp(IngeniousBuildDemo));

    expect(html).toContain("Stops Board");
    expect(html).toContain("Select Bus Line");
    expect(html).toContain("Please select a bus line first");
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

  it("renders the PropertiaG Roman numeral calculator", () => {
    const html = renderToStaticMarkup(createElement(PropertiaGDemo));

    expect(html).toContain("Integer to Roman numeral");
    expect(html).toContain("XLII");
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

  it("renders the fixture-backed Vue.js episode guide", async () => {
    const html = await renderToString(createSSRApp(VueJsDemo));

    expect(html).toContain("Signal Lost");
    expect(html).toContain("The Carrier Wave");
    expect(html).toContain("Page 1 of 3");
  });
});
