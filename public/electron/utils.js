const { app } = require("electron");

module.exports.isDev =
  process.env.ELECTRON_IS_DEV === "1" ? true : !app.isPackaged;
