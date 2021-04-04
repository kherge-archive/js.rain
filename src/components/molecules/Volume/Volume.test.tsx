import Volume from "./Volume";
import { fireEvent, render } from "@testing-library/react";

type Props = {
  muted: boolean;
  onClick: () => void;
  volume: number;
};

const build = (props: Partial<Props>) => {
  ({ container } = render(
    <Volume
      {...{
        muted: false,
        onClick: () => {},
        volume: 100,
      }}
      {...(props as Props)}
    />
  ));

  expect(container).not.toBeUndefined();

  icon = container.querySelector("svg") as SVGSVGElement;

  expect(icon).not.toBeUndefined();
};

let container: HTMLElement;
let icon: SVGSVGElement;

describe("<Volume/>", () => {
  test("should invoke onClick on click", () => {
    const onClick = jest.fn();

    build({
      onClick,
    });

    fireEvent.click(container.querySelector("button") as HTMLButtonElement);

    expect(onClick).toHaveBeenCalled();
  });

  test("should use volume mute icon", () => {
    build({
      muted: true,
    });

    expect(icon.classList).toContain("fa-volume-mute");
  });

  test("should use volume up icon", () => {
    build({
      volume: 50,
    });

    expect(icon.classList).toContain("fa-volume-up");
  });

  test("should use volume down icon", () => {
    build({
      volume: 49,
    });

    expect(icon.classList).toContain("fa-volume-down");
  });

  test("should use volume off icon", () => {
    build({
      volume: 0,
    });

    expect(icon.classList).toContain("fa-volume-off");
  });
});
