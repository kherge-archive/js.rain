import Button from "./Button";
import { render } from "@testing-library/react";

const build = () => render(<Button />);

describe("<Button/>", () => {
  test("renders without error", () => {
    build();
  });
});
