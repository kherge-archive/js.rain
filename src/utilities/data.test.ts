import { getItem, setItem } from "./data";

describe("The data utility", () => {
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

  describe("getItem() function", () => {
    test("should return None if no value is set", () => {
      mockStorage.getItem.mockImplementation(() => null);

      const item = getItem("test");

      expect(mockStorage.getItem).toHaveBeenCalledWith("test");
      expect(item.isNone()).toBe(true);
    });

    test("should return the decoded value as Some", () => {
      const value = { test: 123 };
      const json = JSON.stringify(value);

      mockStorage.getItem.mockImplementation(() => json);

      const item = getItem("test");

      expect(mockStorage.getItem).toHaveBeenCalledWith("test");
      expect(item.isSome()).toBe(true);
      expect(item.expect("")).toStrictEqual(value);
    });
  });

  describe("setItem() function", () => {
    test("should encode and set the value", () => {
      const value = { test: 123 };

      setItem("test", value);

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "test",
        JSON.stringify(value)
      );
    });
  });
});
