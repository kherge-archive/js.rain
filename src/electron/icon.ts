import is from "electron-is";
import path from "path";
import { NativeImage, nativeImage, nativeTheme } from "electron";

/**
 * Returns the icon as a native image.
 *
 * @returns The icon image.
 */
export const getTrayIconAsImage = (): NativeImage =>
  nativeImage.createFromPath(getTrayIconAsPath());

/**
 * Returns the path to the tray icon.
 *
 * @return The icon path.
 */
export const getTrayIconAsPath = (): string => {
  let icon: string = "icon512.png";

  if (is.macOS()) {
    if (nativeTheme.shouldUseDarkColors) {
      icon = "tray/dark.png";
    } else {
      icon = "tray/light.png";
    }
  } else if (is.windows()) {
    icon = "icon.ico";
  }

  // Remember, this is relative to build/.
  return path.join(__dirname, "icons", icon);
};

/**
 * Returns the path to the window icon.
 *
 * @return The icon path.
 */
export const getWindowIconAsPath = (): string => {
  let icon: string = "icon512.png";

  if (is.macOS()) {
    icon = "icon.icns";
  } else if (is.windows()) {
    icon = "icon.ico";
  }

  // Remember, this is relative to build/.
  return path.join(__dirname, "icons", icon);
};
