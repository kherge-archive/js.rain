import View from "./View";
import { render } from "@testing-library/react";

const build = () => render(<View />);

describe("<App/>", () => {
  describe("view", () => {
    test("renders without error", () => {
      build();
    });
  });
});
