import * as Grid from "./Grid";

describe("Grid", () => {
  test("should export Col", () => {
    expect(Grid).toHaveProperty("Col");
  });

  test("should export Container", () => {
    expect(Grid).toHaveProperty("Container");
  });

  test("should export Row", () => {
    expect(Grid).toHaveProperty("Row");
  });
});
