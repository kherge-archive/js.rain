import is from "electron-is";
import { APPLICATION_NAME } from "./config";
import { BrowserWindow, Menu, MenuItem, Tray, app } from "electron";
import { getTrayIconAsImage } from "./icon";
import { toggleAutoStart, willAutoStart } from "./autorun";

/**
 * Creates the icon for the system tray.
 *
 * @param window The window.
 *
 * @return The icon.
 */
export const createTrayIcon = (window: BrowserWindow): Tray => {
  const icon = new Tray(getTrayIconAsImage());

  // Set a relevant name for the tooltip.
  icon.setToolTip(APPLICATION_NAME);

  // Open the window and focus it when the icon is clicked.
  icon.on("click", () => {
    if (!is.macOS()) {
      window.show();
    }
  });

  return icon;
};

/**
 * Creates the menu for the system tray icon.
 *
 * @param icon   The icon.
 * @param window The window.
 */
export const createTrayMenu = (icon: Tray, window: BrowserWindow) => {
  const menu = new Menu();

  // Add option to show the window.
  if (is.macOS()) {
    menu.append(
      new MenuItem({
        id: "settings",
        label: "Settings",
        click: () => {
          window.show();
        },
      })
    );

    menu.append(
      new MenuItem({
        type: "separator",
      })
    );
  }

  // Add an option to toggle auto start.
  menu.append(
    new MenuItem({
      id: "auto-start",
      label: "Run at Login",
      type: "checkbox",
      checked: willAutoStart(),
      click: () => {
        const self = menu.getMenuItemById("auto-start") as MenuItem;

        toggleAutoStart(self.checked);
      },
    })
  );

  // Add a divider.
  menu.append(
    new MenuItem({
      type: "separator",
    })
  );

  // Add an option to open the debugger.
  if (is.dev()) {
    menu.append(
      new MenuItem({
        id: "debugger",
        label: "Open Debugger",
        click: () => window.webContents.openDevTools({ mode: "detach" }),
      })
    );
  }

  // Add an option to quit the app.
  menu.append(
    new MenuItem({
      id: "quit",
      label: "Quit",
      click: () => app.quit(),
    })
  );

  icon.setContextMenu(menu);
};
