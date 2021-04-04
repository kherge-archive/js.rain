const path = require("path");
const { nativeImage } = require("electron");

// The path to the favorites icon.
const iconPath = path.join(__dirname, "../favicon.ico");

// The native image for the favorites icon.
const nativeIcon = nativeImage.createFromPath(iconPath);

module.exports.iconPath = iconPath;
module.exports.nativeIcon = nativeIcon;
