import is from "electron-is";
import path from "path";
import { BrowserWindow, Event } from "electron";
import { getIconAsPath } from "./icon";

/**
 * Creates a new window pointing to the React app.
 *
 * @return The window.
 */
export const createWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    icon: getIconAsPath(),
  });

  // Hide from the taskbar.
  window.setSkipTaskbar(true);

  // Disable the window menu.
  window.removeMenu();

  // Disable window size changes.
  window.setFullScreenable(false);
  window.setMaximizable(false);
  window.setResizable(false);

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
