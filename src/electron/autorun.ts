import { APPLICATION_NAME } from "./config";
import { app } from "electron";

/**
 * Enables or disables automatically running after login.
 *
 * @param start Start the application after login?
 */
export const toggleAutoStart = (start: boolean) => {
  app.setLoginItemSettings({
    enabled: start,
    name: APPLICATION_NAME,
    openAsHidden: true,
    openAtLogin: start,
  });
};

/**
 * Checks if the application will be automatically run after login.
 *
 * @return Returns `true` if it is, or `false` if not.
 */
export const willAutoStart = (): boolean => {
  const settings = app.getLoginItemSettings();

  return settings.executableWillLaunchAtLogin;
};
