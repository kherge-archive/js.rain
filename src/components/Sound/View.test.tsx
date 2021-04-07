import View, { Props } from "./View";
import { act, fireEvent } from "@testing-library/react";
import { render } from "src/utilities/testing";

const build = (props: Partial<Props> = {}) =>
  render(
    <View
      {...{
        id: "test",
        label: "Test",
        mute: false,
        onChange: () => {},
        volume: 100,
        ...props,
      }}
    />
  );

describe("<Sound/>", () => {
  describe("view", () => {
    test("should render without error", () => {
      build();
    });

    test("should render the label", () => {
      const { getByText } = build({ label: "Test Label" });

      getByText("Test Label");
    });

    test("should render the mute button", () => {
      const { getBySelector } = build({ mute: true });

      const button = getBySelector("button");

      expect(button.classList).toContain("MuiIconButton-colorSecondary");
    });

    test("should not render the mute button", () => {
      const { getBySelector } = build({ mute: false });

      const button = getBySelector("button");

      expect(button.classList).toContain("MuiIconButton-colorPrimary");
    });

    test("should match the slider value to the volume level", () => {
      let getBySelector;

      ({ getBySelector } = build({ volume: 100 }));

      getBySelector('input[type="hidden"][value="100"]');

      ({ getBySelector } = build({ volume: 50 }));

      getBySelector('input[type="hidden"][value="50"]');
    });

    test("should invoke onChange when mute button is clicked", () => {
      const onChange = jest.fn();
      const { getBySelector } = build({ mute: false, onChange, volume: 50 });

      const button = getBySelector("button");

      act(() => {
        fireEvent.click(button);
      });

      expect(onChange).toHaveBeenCalledWith(50, true);
    });
  });
});
