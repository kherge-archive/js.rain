import View, { Props as ViewProps } from "./View";
import { useEffect, useRef } from "react";

type ContainerProps = {
  /**
   * The URL to the sound file.
   */
  url: string;
};
type OptionalProps = Partial<Pick<ViewProps, "muted" | "volume">>;
type RequiredProps = Pick<ViewProps, "id" | "label" | "tabIndex">;

export type Props = ContainerProps & OptionalProps & RequiredProps;

const Container = ({ muted = true, url, volume = 100, ...props }: Props) => {
  const audio = useRef<HTMLAudioElement>(null);

  /**
   * Sets the muted state on the audio element.
   *
   * @param muted The state.
   */
  const onMuted = (muted: boolean) => {
    if (audio.current) {
      audio.current.muted = muted;
    }
  };

  /**
   * Sets the volume on the audio element.
   *
   * @param volume The volume.
   */
  const onVolume = (volume: number) => {
    if (audio.current) {
      audio.current.volume = volume / 100;
    }
  };

  return (
    <>
      <audio autoPlay loop muted={muted} ref={audio} src={url} />
      <View
        {...{
          muted,
          onMuted,
          onVolume,
          volume,
          ...props,
        }}
      />
    </>
  );
};

export default Container;
