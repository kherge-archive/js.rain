import is from "electron-is";
import path from "path";
import { NativeImage, nativeImage, nativeTheme } from "electron";

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
  let icon: string = "icon512.png";

  if (is.macOS()) {
    if (nativeTheme.shouldUseDarkColors) {
      icon = "tray/light.png";
    } else {
      icon = "tray/dark.png";
    }
  } else if (is.windows()) {
    icon = "icon.ico";
  }

  // Remember, this is relative to build/.
  return path.join(__dirname, "icons", icon);
};
