const isDev = require("electron-is-dev");
const path = require("path");
const { BrowserWindow, app } = require("electron");

// Integrate Windows support.
if (require("electron-squirrel-startup")) {
  app.quit();
}

/**
 * Creates and configures a new browser window.
 */
const createWindow = () => {
  // Get the path to the icon.
  const icon = path.join(__dirname, "favicon.ico");

  // Create a new window.
  const window = new BrowserWindow({
    icon,
    height: 220,
    width: 480,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Hide the window when minimized.
  window.on("minimize", (event) => {
    event.preventDefault();
    window.hide();
  });

  // Disable the window menu.
  window.removeMenu();

  // Disable resizing.
  window.setResizable(false);

  // Load the React app.
  if (isDev) {
    window.loadURL("http://localhost:3000");
    window.webContents.openDevTools({ mode: "detach" });
  } else {
    window.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
  }
};

// When the macOS dock app icon is clicked, re-open the window.
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Do not exist if all windows are closed on macOS.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Create the window when the browser is ready.
app.whenReady().then(createWindow);
