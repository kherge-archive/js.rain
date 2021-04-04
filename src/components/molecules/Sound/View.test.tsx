import View, { Props } from "./View";
import { fireEvent, render } from "@testing-library/react";

const build = ({
  id = "id",
  label = "label",
  muted = false,
  onMuted = () => {},
  onVolume = () => {},
  volume = 100,
}: Partial<Props> = {}) => {
  ({ container } = render(
    <View {...{ id, label, muted, onMuted, onVolume, volume }} />
  ));

  expect(container).not.toBeNull();
};

let container: HTMLElement;

describe("<Sound/>", () => {
  describe("view", () => {
    test("should render without error", () => {
      build();
    });

    test("should disable controls on mute", () => {
      build({ muted: true });

      const range = container.querySelector(
        'input[type="range"]'
      ) as HTMLInputElement;

      expect(range).not.toBeNull();
      expect(range.disabled).toBe(true);

      const text = container.querySelector(
        'input[id="id-input"]'
      ) as HTMLInputElement;

      expect(text).not.toBeNull();
      expect(text.disabled).toBe(true);
    });

    test("should invoke onMute when when mute button is clicked", () => {
      const onMuted = jest.fn();

      build({ onMuted });

      const button = container.querySelector("button") as HTMLButtonElement;

      fireEvent.click(button);

      expect(onMuted).toHaveBeenCalled();
    });

    test("should invoke onVolume when volume level is changed", () => {
      const onVolume = jest.fn();

      build({ onVolume });

      // range change
      const range = container.querySelector(
        'input[type="range"]'
      ) as HTMLInputElement;

      fireEvent.change(range, {
        target: {
          value: "33",
        },
      });

      expect(onVolume).toHaveBeenCalledWith(33);

      // text change
      const text = container.querySelector(
        'input[id="id-input"]'
      ) as HTMLInputElement;

      fireEvent.change(text, {
        target: {
          value: "99",
        },
      });

      expect(onVolume).toHaveBeenCalledWith(99);
    });
  });
});
