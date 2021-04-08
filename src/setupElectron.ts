import { BrowserWindow, Tray, app } from "electron";
import { createTrayIcon, createTrayMenu } from "./electron/tray";
import { createWindow } from "./electron/window";

// Intercept Squirrel setup on Windows.
// https://www.electronforge.io/config/makers/squirrel.windows
if (require("electron-squirrel-startup")) app.quit();

// Global instances to avoid garbage collection.
// https://stackoverflow.com/a/58597207
let icon: Tray;
let window: BrowserWindow;

// Hide the app from the macOS dock.
app.dock.hide();

// Wait until Electron is ready.
app.whenReady().then(() => {
  window = createWindow();
  icon = createTrayIcon(window);

  createTrayMenu(icon, window);
});
