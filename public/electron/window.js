const { BrowserWindow } = require("electron");
const { iconPath } = require("./icon");
const { isDev } = require("./utils");

/**
 * Manages the process of creating a new application window.
 *
 * @throws If a window already exists.
 */
const createWindow = () => {
  if (getWindow().isSome()) {
    throw new Error("A window already exists.");
  }

  const window = new BrowserWindow({
    iconPath,
    webPreferences: {
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
    window.loadURL(`file://${path.join(__dirname, "../../build/index.html")}`);
  }
};

/**
 * Returns the existing application window.
 *
 * @return The window, if any.
 *
 * @throws If too many application windows were found.
 */
const getWindow = () => {
  const windows = BrowserWindow.getAllWindows();

  if (windows.length > 1) {
    throw new Error("Too many application windows found.");
  } else if (windows.length > 0) {
    return {
      isNone() {
        return false;
      },
      isSome() {
        return true;
      },
      map(cb) {
        cb(windows[0]);
      },
    };
  }

  return {
    isNone() {
      return true;
    },
    isSome() {
      return false;
    },
  };
};

module.exports.createWindow = createWindow;
module.exports.getWindow = getWindow;
