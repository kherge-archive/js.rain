import { BrowserWindow, Menu, MenuItem, Tray, app } from "electron";
import { getIconAsImage } from "./icon";
import { toggleAutoStart, willAutoStart } from "./autorun";

/**
 * Creates the icon for the system tray.
 *
 * @param window The window.
 *
 * @return The icon.
 */
export const createTrayIcon = (window: BrowserWindow): Tray => {
  const icon = new Tray(getIconAsImage());

  // Set a relevant name for the tooltip.
  icon.setToolTip("Rain");

  // Open the window and focus it when the icon is clicked.
  icon.on("click", () => {
    window.show();
    window.focus();
  });

  return icon;
};

/**
 * Creates the menu for the system tray icon.
 *
 * @param icon The icon.
 */
export const createTrayMenu = (icon: Tray) => {
  const menu = new Menu();

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
