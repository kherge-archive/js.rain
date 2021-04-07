import View, { OnChange } from "./View";
import hash from "hash-sum";
import { getItem, setItem } from "src/utilities/data";
import { useState } from "react";

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
};

/**
 * The default settings.
 */
const defaults: Item = {
  muted: false,
  volume: 50,
};

const Container = ({ label }: Props) => {
  console.debug(`<Sound.Container label="${label}"/>`);

  const id = hash(label);
  const item = getItem<Item>(id).getOrInsert(defaults);
  const [mute, setMute] = useState(item.muted);
  const [volume, setVolume] = useState(item.volume);

  const onChange: OnChange = (volume, mute) => {
    setItem(id, {
      muted: mute,
      volume,
    });

    setMute(mute);
    setVolume(volume);
  };

  return (
    <View
      {...{
        id,
        label,
        mute,
        onChange,
        volume,
      }}
    />
  );
};

export default Container;
