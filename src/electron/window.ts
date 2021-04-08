import is from "electron-is";
import path from "path";
import { BrowserWindow, Event, nativeTheme } from "electron";
import { WINDOW_SIZE } from "./config";
import { getWindowIconAsPath } from "./icon";
import { willAutoStart } from "./autorun";

/**
 * Creates a new window pointing to the React app.
 *
 * @return The window.
 */
export const createWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    backgroundColor: nativeTheme.shouldUseDarkColors ? "#252525" : "#FFFFFF",
    center: true,
    icon: getWindowIconAsPath(),
    fullscreenable: false,
    maxHeight: WINDOW_SIZE.height,
    maxWidth: WINDOW_SIZE.width + 200,
    maximizable: false,
    minHeight: WINDOW_SIZE.height,
    minWidth: WINDOW_SIZE.width,
    show: !willAutoStart(),
    useContentSize: true,
  });

  // Disable the window menu.
  window.removeMenu();

  // Set a fixed window size.
  window.setContentSize(WINDOW_SIZE.width, WINDOW_SIZE.height);

  // Hide the window when minimized.
  window.on("minimize", (event: Event) => {
    event.preventDefault();

    window.hide();
  });

  if (is.dev()) {
    // Assume that react-script start is running.
    window.loadURL("http://localhost:3000");

    // Show dev tools for convenience.
    window.webContents.openDevTools({ mode: "detach" });
  } else {
    // Use the production build of the React app.
    // Remember that our paths are relative to build/.
    window.loadURL(`file://${path.join(__dirname, "index.html")}`);
  }

  return window;
};
