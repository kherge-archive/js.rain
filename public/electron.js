const isDev = require("electron-is-dev");
const path = require("path");
const { BrowserWindow, Menu, Tray, app, nativeImage } = require("electron");

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
      enablePreferredSizeMode: true,
      nodeIntegration: true,
    },
  });

  // Hide by default.
  window.hide();

  // Adjusts window size to fit contents.
  window.webContents.on("preferred-size-changed", (_, preferredSize) => {
    window.setSize(preferredSize.width, preferredSize.height);
  });

  // Hide the window when closed.
  window.on("close", (event) => {
    event.preventDefault();
    window.hide();
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

  // Set a context menu to show the window or quit.
  const tray = new Tray(nativeImage.createFromPath(icon));

  tray.setToolTip("Rain");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => {
          window.show();
        },
      },
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ])
  );

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
