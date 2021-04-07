import is from "electron-is";
import path from "path";
import { NativeImage, nativeImage } from "electron";

/**
 * Returns the icon as a native image.
 *
 * @returns The icon image.
 */
export const getIconAsImage = (): NativeImage =>
  nativeImage.createFromPath(getIconAsPath());

/**
 * Returns the path to the icon.
 *
 * @return The icon path.
 */
export const getIconAsPath = (): string => {
  let icon: string = "logo512.png";

  if (is.macOS()) {
    icon = "favicon.icns";
  } else if (is.windows()) {
    icon = "favicon.ico";
  }

  // Remember, this is relative to build/.
  return path.join(__dirname, icon);
};
