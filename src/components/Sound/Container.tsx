import View, { OnChange } from "./View";
import hash from "hash-sum";
import { getItem, setItem } from "src/utilities/data";
import { useEffect, useRef, useState } from "react";

export type Item = {
  /**
   * The muted state.
   */
  muted: boolean;

  /**
   * The volume level.
   */
  volume: number;
};

export type Props = {
  /**
   * The label for the sound.
   */
  label: string;

  /**
   * The URL to the sound file.
   */
  url: string;
};

/**
 * The default settings.
 */
const defaults: Item = {
  muted: false,
  volume: 50,
};

const Container = ({ label, url }: Props) => {
  console.debug(`<Sound.Container label="${label}"/>`);

  const audio = useRef<HTMLAudioElement>(null);
  const id = hash(label);
  const item = getItem<Item>(id).getOrInsert(defaults);
  const [mute, setMute] = useState(item.muted);
  const [volume, setVolume] = useState(item.volume);

  const onChange: OnChange = (volume, mute) => {
    setItem(id, {
      muted: mute,
      volume,
    });

    setAudio(mute, volume);
    setMute(mute);
    setVolume(volume);
  };

  const setAudio = (muted: boolean, volume: number) => {
    if (audio.current) {
      audio.current.muted = muted;
      audio.current.volume = volume / 100;
    }
  };

  // Set proper audio state on first load.
  useEffect(() => setAudio(mute, volume), [audio, mute, volume]);

  return (
    <>
      <audio autoPlay loop ref={audio} src={url} />
      <View
        {...{
          id,
          label,
          mute,
          onChange,
          volume,
        }}
      />
    </>
  );
};

export default Container;
