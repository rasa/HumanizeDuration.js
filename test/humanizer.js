// @ts-check

const humanizeDuration = require("..");
const humanizer = humanizeDuration.humanizer;
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ms = require("ms");

describe("humanizer", function () {
  it("humanizes English when passed no arguments", function () {
    const h = humanizer();

    assert.strictEqual(h(1000), "1s");
  });

  it("humanizes English when passed an empty object", function () {
    const h = humanizer({});

    assert.strictEqual(h(1000), "1s");
  });

  it("can change the delimiter", function () {
    const h = humanizer({ delimiter: "+" });

    assert.strictEqual(h(0), "0s");
    assert.strictEqual(h(1000), "1s");
    assert.strictEqual(h(363000), "6m+3s");
  });

  it("can change the spacer", function () {
    const h = humanizer({ spacer: " whole " });

    assert.strictEqual(h(0), "0 whole s");
    assert.strictEqual(h(1000), "1 whole s");
    assert.strictEqual(h(260040000), "3 whole d 14 whole m");
  });

  it("can use a conjunction", function () {
    const h = humanizer({ conjunction: " and " });

    assert.strictEqual(h(0), "0s");
    assert.strictEqual(h(1000), "1s");
    assert.strictEqual(h(260040000), "3d and 14m");
    assert.strictEqual(h(10874000), "3h 1m, and 14s");
  });

  it("can use a conjunction without a serial comma", function () {
    const h = humanizer({
      conjunction: " & ",
      serialComma: false,
    });

    assert.strictEqual(h(1000), "1s");
    assert.strictEqual(h(260040000), "3d & 14m");
    assert.strictEqual(h(10874000), "3h 1m & 14s");
  });

  it("can change the units", function () {
    const h = humanizer({ units: ["d"] });

    assert.strictEqual(h(0), "0d");
    assert.strictEqual(h(ms("6h")), "0.25d");
    assert.strictEqual(h(ms("7d")), "7d");
  });

  it("can overwrite the unit measures in the initializer", function () {
    const h = humanizer({
      unitMeasures: {
        y: 10512000000,
        mo: 864000000,
        w: 144000000,
        d: 28800000,
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1,
      },
    });

    assert.strictEqual(h(1000), "1s");
    assert.strictEqual(h(3600000), "1h");
    assert.strictEqual(h(28800000), "1d");
    assert.strictEqual(h(144000000), "1w");
  });

  it("can change the decimal", function () {
    const h = humanizer({
      units: ["s"],
      decimal: "what",
    });

    assert.strictEqual(h(1234), "1what234s");
    assert.strictEqual(
      h(1234, {
        decimal: "!!",
      }),
      "1!!234s"
    );
  });

  it("can do simple rounding", function () {
    const h = humanizer({ round: true });

    assert.strictEqual(h(0), "0s");
    assert.strictEqual(h(499), "0s");
    assert.strictEqual(h(500), "1s");
    assert.strictEqual(h(1000), "1s");
    assert.strictEqual(h(1499), "1s");
    assert.strictEqual(h(1500), "2s");
    assert.strictEqual(h(1500), "2s");
    assert.strictEqual(h(121499), "2m 1s");
    assert.strictEqual(h(121500), "2m 2s");
  });

  it('can do rounding with the "units" option', function () {
    const h = humanizer({ round: true });

    assert.strictEqual(
      h(86364000, { units: ["y", "mo", "w", "d", "h"] }),
      "1d"
    );
    assert.strictEqual(
      h(1209564000, { units: ["y", "mo", "w", "d", "h"] }),
      "2w"
    );
    assert.strictEqual(h(3692131200000, { units: ["y", "mo"] }), "117y");
    assert.strictEqual(
      h(3692131200001, { units: ["y", "mo", "w", "d", "h", "m"] }),
      "116y 11mo 4w 1d 4h 30m"
    );
  });

  it('can do rounding with the "largest" option', function () {
    const h = humanizer({ round: true });

    assert.strictEqual(h(3692131200000, { largest: 1 }), "117y");
    assert.strictEqual(h(3692131200000, { largest: 2 }), "117y");
    assert.strictEqual(
      h(3692131200001, { largest: 100 }),
      "116y 11mo 4w 1d 4h 30m"
    );
    assert.strictEqual(h(2838550, { largest: 3 }), "47m 19s");
  });

  it('can do rounding with the "maxDecimalPoints" option', function () {
    var h = humanizer({ maxDecimalPoints: 2 });

    assert.strictEqual(h(8123.456789), "8.12s");
    h.maxDecimalPoints = 3;
    assert.strictEqual(h(8123.456789), "8.123s");
    assert.strictEqual(h(8000), "8s");

    h.maxDecimalPoints = 6;
    assert.strictEqual(h(8123.45), "8.12345s");

    h.maxDecimalPoints = 6;
    assert.strictEqual(h(8000), "8s");

    h.maxDecimalPoints = 0;
    assert.strictEqual(h(7123.456), "7s");
    h.maxDecimalPoints = 2;
    assert.strictEqual(h(7999), "7.99s");
    h.maxDecimalPoints = 3;
    assert.strictEqual(h(7999), "7.999s");
  });

  it("can ask for the largest units", function () {
    const h = humanizer({ largest: 2 });

    assert.strictEqual(h(0), "0s");
    assert.strictEqual(h(1000), "1s");
    assert.strictEqual(h(2000), "2s");
    assert.strictEqual(h(540360012), "6d 6h");
    assert.strictEqual(h(540360012, { largest: 3 }), "6d 6h 6m");
    assert.strictEqual(h(540360012, { largest: 100 }), "6d 6h 6m 0.012s");
  });

  it("has properties which can be modified", function () {
    const h = humanizer();

    assert.strictEqual(h(363000), "6m 3s");

    h.delimiter = "+";
    assert.strictEqual(h(363000), "6m+3s");

    h.language = "es";
    assert.strictEqual(h(363000), "6m+3s");

    h.units = ["m"];
    assert.strictEqual(h(363000), "6,05m");
  });

  it("is a named function", function () {
    assert.strictEqual(humanizer().name, "humanizer");
  });

  it("can add a new language", function () {
    const h = humanizer({ language: "cool language" });
    h.languages["cool language"] = {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
      delimiter: "--",
    };

    assert.strictEqual(h(1000), "1s");
    assert.strictEqual(h(61000), "1m--1s");

    assert.strictEqual(h(61000, { delimiter: "&&" }), "1m&&1s");

    assert.strictEqual(
      h(1000, {
        language: "es",
      }),
      "1s"
    );

    const anotherH = humanizer({
      language: "cool language",
    });
    assert.throws(() => {
      anotherH(1000);
    }, Error);
  });

  it("can overwrite an existing language", function () {
    const h = humanizer({ language: "en" });

    assert.strictEqual(h(1000), "1s");

    h.languages.en = {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
    };

    assert.strictEqual(h(1000), "1s");
    assert.strictEqual(h(15600000), "4h 20m");

    const anotherH = humanizer({ language: "en" });

    assert.strictEqual(anotherH(1000), "1s");
  });

  it("can overwrite the languages property in the initializer", function () {
    const h = humanizer({
      languages: {
        en: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "d",
          h: () => "h",
          m: () => "m",
          s: () => "s",
          ms: () => "ms",
          decimal: "!",
        },
      },
    });

    assert.strictEqual(h(1000), "1s");
    assert.strictEqual(h(15600000), "4h 20m");
    assert.strictEqual(h(1000, { language: "es" }), "1s");
    assert.strictEqual(h(71750), "1m 11!75s");
  });

  it('uses "." as a fallback for a missing decimal', function () {
    const h = humanizer({
      languages: {
        en: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "d",
          h: () => "h",
          m: () => "m",
          s: () => "s",
          ms: () => "ms",
        },
      },
    });

    assert.strictEqual(h(71750), "1m 11.75s");
    assert.strictEqual(h(71750, { decimal: "!" }), "1m 11!75s");
  });

  it("accepts fallback languages", function () {
    const h = humanizer();

    assert.strictEqual(h(10000, { language: "es", fallbacks: ["en"] }), "10s");
    assert.strictEqual(
      h(10000, { language: "BAD", fallbacks: ["BAD", "es"] }),
      "10s"
    );
    assert.strictEqual(
      h(10000, { language: "BAD", fallbacks: ["es", "fr"] }),
      "10s"
    );
  });

  it("can replace digits", function () {
    const h = humanizer({
      digitReplacements: [
        "Zero",
        "One",
        "Two",
        "Three",
        "UNUSED",
        "UNUSED",
        "UNUSED",
        "UNUSED",
        "UNUSED",
        "UNUSED",
      ],
    });
    assert.strictEqual(h(123), "Zero.OneTwoThrees");
  });
});
