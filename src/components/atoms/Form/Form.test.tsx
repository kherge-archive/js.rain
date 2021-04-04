import Form from "./Form";
import { render } from "@testing-library/react";

const build = () => render(<Form />);

describe("<Form/>", () => {
  test("renders without error", () => {
    build();
  });
});
