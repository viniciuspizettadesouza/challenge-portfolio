import BlueticketDemo from "@challenge/blueticket-demo";
import CastlabsDemo from "@challenge/castlabs-demo";
import ClimateSeedDemo from "@challenge/climateseed-demo";
import FyldHansecomDemo from "@challenge/fyld-hansecom-demo";
import IngeniousBuildDemo from "@challenge/ingenious-build-demo";
import InstructDemo from "@challenge/instruct-demo";
import JExpertsDemo from "@challenge/jexperts-demo";
import LagoasoftDemo from "@challenge/lagoasoft-demo";
import MeetimeDemo from "@challenge/meetime-demo";
import OnSignTvDemo from "@challenge/onsign-tv-demo";
import PipzDemo from "@challenge/pipz-demo";
import PropertiaGDemo from "@challenge/propertiag-demo";
import SalsifyDemo from "@challenge/salsify-demo";
import StormtechDemo from "@challenge/stormtech-demo";
import SwordHealthDemo from "@challenge/swordhealth-demo";
import VueDemo from "@challenge/vue-demo";
import VueJsDemo from "@challenge/vuejs-demo";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { describe, expect, it } from "vitest";

describe("pilot demos", () => {
  it("renders the local JExperts employee directory", () => {
    const html = renderToStaticMarkup(createElement(JExpertsDemo));

    expect(html).toContain("JExperts");
    expect(html).toContain("Create User");
    expect(html).toContain("See all Users");
    expect(html).toContain("Search users by name");
  });

  it("renders the local Stormtech sorting scenarios", () => {
    const html = renderToStaticMarkup(createElement(StormtechDemo));

    expect(html).toContain("Storm Tecnologia");
    expect(html).toContain("Book catalog");
    expect(html).toContain("Java How To Program");
    expect(html).toContain("Sorting scenarios");
  });

  it("renders the local Meetime lead workflow", async () => {
    const html = await renderToString(createSSRApp(MeetimeDemo));

    expect(html).toContain("Add lead");
    expect(html).toContain("Outbound SMB");
    expect(html).toContain("Private API replaced with local browser state");
  });

  it("renders the local OnSign TV six-hour forecast", async () => {
    const html = await renderToString(createSSRApp(OnSignTvDemo));

    expect(html).toContain("Weather for the next six hours");
    expect(html).toContain("Florianópolis");
    expect(html).toContain("Feels Like");
  });

  it("renders the local Blueticket weather search", async () => {
    const html = await renderToString(createSSRApp(BlueticketDemo));

    expect(html).toContain("What is the weather like?");
    expect(html).toContain("Florianópolis");
    expect(html).toContain("Weather description");
  });

  it("renders the local Castlabs episode manager", () => {
    const html = renderToStaticMarkup(createElement(CastlabsDemo));

    expect(html).toContain("TV Series Episodes");
    expect(html).toContain("Local subscription simulation");
    expect(html).toContain("The Quiet Frequency");
  });

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
