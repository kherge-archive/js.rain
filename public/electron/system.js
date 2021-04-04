const { Menu, Tray, app, MenuItem } = require("electron");
const { getWindow } = require("./window");
const { nativeIcon } = require("./icon");

/**
 * Manages the process of creating a new system tray icon.
 *
 * @throws If a tray icon already exists.
 */
const createTrayIcon = () => {
  if (globalThis.trayIcon) {
    throw new Error("A tray icon already exists.");
  } else {
    globalThis.trayIcon = new Tray(nativeIcon);
  }

  // Open the window when the icon is clicked.
  trayIcon.on("click", () => {
    getWindow().map((window) => window.show());
  });

  // Use the app name as the tooltip.
  trayIcon.setToolTip("Rain");
};

/**
 * Manages the process of creating a new system tray menu.
 *
 * @throws If a tray icon does not exist.
 * @throws If a tray menu already exists.
 */
const createTrayMenu = () => {
  if (globalThis.trayMenu) {
    throw new Error("A tray menu already exists.");
  } else {
    globalThis.trayMenu = new Menu();
  }

  if (!globalThis.trayIcon) {
    throw new Error("A tray icon must first exist.");
  }

  // Show the window when it is hidden.
  trayMenu.append(
    new MenuItem({
      id: "show",
      label: "Show",
      click: () => {
        const window = getWindow().expect("A window should exist.");

        if (window.isMinimized) {
          window.show();
        }

        window.focus();
      },
    })
  );

  // (divider)
  trayMenu.append(
    new MenuItem({
      type: "separator",
    })
  );

  // Quit the application.
  trayMenu.append(
    new MenuItem({
      id: "quit",
      label: "Quit",
      click: () => {
        app.quit();
      },
    })
  );

  trayIcon.setContextMenu(trayMenu);
};

module.exports.createTrayIcon = createTrayIcon;
module.exports.createTrayMenu = createTrayMenu;
