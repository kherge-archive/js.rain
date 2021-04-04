import Container, { Props } from "./Container";
import { fireEvent, render } from "@testing-library/react";

const build = ({
  id = "id",
  label = "label",
  url = "",
  ...props
}: Partial<Props> = {}) =>
  render(<Container {...{ id, label }} {...(props as Props)} />);

describe("<Sound/>", () => {
  describe("container", () => {
    test("should synchronize audio mute and mute button", () => {
      const { container } = build();

      const audio = container.querySelector("audio") as HTMLAudioElement;
      const muted = audio.muted;
      const button = container.querySelector("button") as HTMLButtonElement;

      fireEvent.click(button);

      expect(audio.muted).toBe(!muted);
    });

    test("should synchronize audio volume and volume control", () => {
      const { container } = build();

      const audio = container.querySelector("audio") as HTMLAudioElement;
      const range = container.querySelector(
        "input[type=range]"
      ) as HTMLInputElement;

      fireEvent.change(range, {
        target: {
          value: "33",
        },
      });

      expect(audio.volume).toEqual(0.33);
    });
  });
});
