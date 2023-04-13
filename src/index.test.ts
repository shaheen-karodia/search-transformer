import { describe, it, expect } from "vitest";
import { GeneralLink, resolveGeneralLink } from "./index";
describe("Whatever", () => {
  it("Should pass CI", () => {
    const generalLink: GeneralLink = {
      type: "ProductListPage",
      filters: [
        {
          filterKey: "productClusterIds",
          filterValue: "2591",
        },
      ],
      vanityUrl: null,
    };
    expect(resolveGeneralLink(generalLink).path).toBe(
      "/2591?map=productClusterIds"
    );
  });
});
