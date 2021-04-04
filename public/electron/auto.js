const { app } = require("electron");

/**
 * Checks the status of auto run.
 *
 * @return Returns `true` if enabled, or `false` if not.
 */
const isAutoRun = () => {
  const settings = app.getLoginItemSettings();

  return settings.executableWillLaunchAtLogin;
};

/**
 * Enables or disables auto run.
 *
 * @param state The auto run state.
 */
const setAutoRun = (state) => {
  app.setLoginItemSettings({
    enabled: state,
    name: "Rain",
    openAsHidden: true,
    openAtLogin: state,
  });
};

module.exports.isAutoRun = isAutoRun;
module.exports.setAutoRun = setAutoRun;
