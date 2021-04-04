import Icon, { faCoffee } from "./Icon";
import { render } from "@testing-library/react";

const build = () => render(<Icon icon={faCoffee} />);

describe("<Icon/>", () => {
  test("should render without error", () => {
    build();
  });
});
