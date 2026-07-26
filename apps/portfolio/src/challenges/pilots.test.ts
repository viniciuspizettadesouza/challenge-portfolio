import SalsifyDemo from "@challenge/salsify-demo";
import VueDemo from "@challenge/vue-demo";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { describe, expect, it } from "vitest";

describe("pilot demos", () => {
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
