import Container from "./Container";
import { render } from "@testing-library/react";

const build = () => render(<Container />);

describe("<App/>", () => {
  describe("container", () => {
    test("should render without error", () => {
      build();
    });
  });
});
