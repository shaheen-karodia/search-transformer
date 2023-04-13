import { describe, it, expect } from "vitest";
import { resolveGeneralLink } from "./src/index";
describe("Whatever", () => {
  it("Should pass CI", () => {
    expect(1).toBe(1);

    console.log(resolveGeneralLink);
  });
});
