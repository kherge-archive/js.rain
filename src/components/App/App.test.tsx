import App from "./App";
import { render } from "src/utilities/testing";

jest.mock("@kherge/prefers-color-scheme", () => ({
  getColorScheme: () => "light",
}));

const build = () => render(<App />);

describe("<App/>", () => {
  test("should render without error", () => {
    build();
  });
});
