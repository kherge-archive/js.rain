import View from "./View";

/**
 * The remembered sound options.
 */
type Options = {
  /**
   * The muted state.
   */
  muted: boolean;

  /**
   * The volume level.
   */
  volume: number;
};

/**
 * Generates the properties for a specific sound.
 *
 * @param id    The sound unique identifier.
 * @param label The label for the sound.
 * @param url   The URL to the sound file.
 *
 * @return The sound options.
 */
const makeSound = (id: string, label: string, url: string) => {
  /**
   * Retrieves the options from local storage, or uses defaults.
   *
   * @return The options.
   */
  const getOptions = (): Options => {
    const item = localStorage.getItem(id);
    let options: Options;

    if (item) {
      options = JSON.parse(item);
    } else {
      options = {
        muted: true,
        volume: 100,
      };

      setOptions(options);
    }

    return options;
  };

  /**
   * Sets the options in local storage.
   *
   * @param options The options.
   */
  const setOptions = (options: Options) => {
    localStorage.setItem(id, JSON.stringify(options));
  };

  /**
   * Updates muted state in local storage.
   *
   * @param muted The state.
   */
  const onMutedChange = (muted: boolean) => {
    const options = {
      ...getOptions(),
      muted,
    };

    setOptions(options);
  };

  /**
   * Updates the volume level in local storage.
   *
   * @param volume The level.
   */
  const onVolumeChange = (volume: number) => {
    const options = {
      ...getOptions(),
      volume,
    };

    setOptions(options);
  };

  // Get remembered options.
  const { muted, volume } = getOptions();

  return {
    id,
    label,
    muted,
    onMutedChange,
    onVolumeChange,
    url,
    volume,
  };
};

const Container = () => (
  <View
    sounds={[
      makeSound("rain", "Rain", "static/mp3/rain.mp3"),
      makeSound("splashing", "Splashing", "static/mp3/splashing.mp3"),
      makeSound("storm", "Storm", "static/mp3/storm.mp3"),
      makeSound("thunder", "Thunder", "static/mp3/thunder.mp3"),
      makeSound("window", "Window", "static/mp3/window.mp3"),
    ]}
  />
);

export default Container;
