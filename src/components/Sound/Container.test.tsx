import Container, { Props } from "./Container";
import hash from "hash-sum";
import { act, fireEvent } from "@testing-library/react";
import { render } from "src/utilities/testing";

const build = (props: Partial<Props> = {}) =>
  render(
    <Container
      {...{
        globalMute: false,
        label: "Test",
        url: "",
        ...props,
      }}
    />
  );

describe("<Sound/>", () => {
  describe("container", () => {
    const mockStorage = {
      getItem: jest.fn() as jest.Mock,
      setItem: jest.fn() as jest.Mock,
    };

    beforeEach(() => {
      mockStorage.getItem.mockClear();
      mockStorage.setItem.mockClear();

      window.localStorage.__proto__.getItem = mockStorage.getItem;
      window.localStorage.__proto__.setItem = mockStorage.setItem;
    });

    test("should render without error", () => {
      mockStorage.getItem.mockImplementation(() => null);

      build();
    });

    test("should render using defaults if no state is available in local storage", () => {
      mockStorage.getItem.mockImplementation(() => null);

      const id = hash("Test Label");
      const { getBySelector, queryBySelector } = build({ label: "Test Label" });

      expect(queryBySelector("svg.MuiSvgIcon-colorSecondary")).toBeNull();
      getBySelector('input[value="50"]');

      expect(mockStorage.getItem).toHaveBeenCalledWith(id);
    });

    test("should restore its state from local storage", () => {
      mockStorage.getItem.mockImplementation(() =>
        JSON.stringify({
          muted: true,
          volume: 35,
        })
      );

      const id = hash("Test Label");
      const { getBySelector } = build({ label: "Test Label" });

      getBySelector('svg[class*="MuiSvgIcon-colorSecondary"]');
      getBySelector('input[value="35"]');

      expect(mockStorage.getItem).toHaveBeenCalledWith(id);
    });

    test("should save its changed state to local storage", () => {
      mockStorage.getItem.mockImplementation(() => null);

      const id = hash("Test Label");
      const { getBySelector } = build({ label: "Test Label" });

      const button = getBySelector("button");

      act(() => {
        fireEvent.click(button);
      });

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        id,
        JSON.stringify({
          muted: true,
          volume: 50,
        })
      );
    });
  });
});
