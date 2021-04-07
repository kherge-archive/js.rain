import App from "./App";
import { render } from "src/utilities/testing";

const build = () => render(<App />);

describe("<App/>", () => {
  test("should render without error", () => {
    build();
  });
});
