import ClimateSeedDemo from "@challenge/climateseed-demo";
import LagoasoftDemo from "@challenge/lagoasoft-demo";
import PropertiaGDemo from "@challenge/propertiag-demo";
import SalsifyDemo from "@challenge/salsify-demo";
import VueDemo from "@challenge/vue-demo";
import VueJsDemo from "@challenge/vuejs-demo";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { describe, expect, it } from "vitest";

describe("pilot demos", () => {
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
