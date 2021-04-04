import Sound from "./sound";
import path from "path";

describe("Sound", () => {
  let sound: Sound;

  beforeEach(() => {
    // allow garbage collection
    if (sound) {
      sound.element.pause();
    }

    sound = new Sound(path.join(__dirname, "../../public/static/mp3/rain.mp3"));
  });

  test("should return the audio element", () => {
    expect(sound.element).not.toBeUndefined();
    expect(sound.element.tagName.toLowerCase()).toEqual("audio");
  });
});
