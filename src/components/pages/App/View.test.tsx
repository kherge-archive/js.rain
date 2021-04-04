import View, { Props } from "./View";
import { render } from "@testing-library/react";

const build = ({ sounds = [sound] }: Partial<Props> = {}) =>
  render(<View {...{ sounds }} />);

const options = {
  id: "id",
  label: "label",
  muted: true,
  onMutedChange: () => {},
  onVolumeChange: () => {},
  url: "",
  volume: 100,
};

let sound = { ...options };

describe("<App/>", () => {
  describe("view", () => {
    beforeEach(() => {
      sound = { ...options };
    });

    test("sound render without error", () => {
      build();
    });
  });
});
