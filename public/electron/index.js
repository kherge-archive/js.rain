const { app } = require("electron");
const { createTrayIcon, createTrayMenu } = require("./system");
const { createWindow } = require("./window");

// Integrate Windows support.
if (require("electron-squirrel-startup")) {
  app.quit();
}

// Launch the application when ready.
app.whenReady().then(() => {
  createTrayIcon();
  createTrayMenu();
  createWindow();
});
