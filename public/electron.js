const { BrowserWindow, Menu, Tray, app, nativeImage } = require("electron");

// Integrate Windows support.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const isDev = require("electron-is-dev");
const path = require("path");
const { none, some } = require("@kherge/result");

// The path to the icon.
const icon = path.join(__dirname, "favicon.ico");

// Create a global system tray.
let tray;

/**
 * Creates and configures a new browser window.
 */
const createWindow = () => {
  // Create a new window.
  const window = new BrowserWindow({
    icon,
    webPreferences: {
      enablePreferredSizeMode: true,
      nodeIntegration: true,
    },
  });

  // Set window size to fit content.
  window.setContentSize(447, 214);

  // Hide by default.
  window.hide();

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

/**
 * Returns the available window.
 *
 * @return The window, if any.
 */
const getWindow = () => {
  const windows = BrowserWindow.getAllWindows();

  if (windows.length > 0) {
    return some(windows[0]);
  }

  return none();
};

// Create the window when the browser is ready.
app.whenReady().then(() => {
  tray = new Tray(nativeImage.createFromPath(icon));

  tray.on("click", () => getWindow().map((window) => window.show()));
  tray.setToolTip("Rain");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => getWindow().map((window) => window.show()),
      },
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ])
  );

  createWindow();
});
