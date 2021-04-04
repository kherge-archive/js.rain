/**
 * Manages the playback of a sound file.
 */
class Sound {
  /**
   * The audio element.
   */
  private audio: HTMLAudioElement;

  /**
   * Sets the URL to the sound file.
   */
  constructor(url: string) {
    this.audio = new Audio(url);
  }

  /**
   * Returns the audio element.
   *
   * @return The element.
   */
  get element() {
    return this.audio;
  }

  /**
   * Starts playing the audio file as soon as it is ready.
   */
  playWhenReady() {
    this.audio.addEventListener("canplay", () => {
      this.audio.play();
    });
  }
}

export default Sound;
