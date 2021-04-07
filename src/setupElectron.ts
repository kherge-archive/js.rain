import { app } from "electron";
import { createTrayIcon, createTrayMenu } from "./electron/tray";
import { createWindow } from "./electron/window";

// Intercept Squirrel setup on Windows.
// https://www.electronforge.io/config/makers/squirrel.windows
if (require("electron-squirrel-startup")) app.quit();

// Wait until Electron is ready.
app.whenReady().then(() => {
  const window = createWindow();
  const icon = createTrayIcon(window);

  createTrayMenu(icon);
});
