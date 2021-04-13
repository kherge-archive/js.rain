module.exports = {
  packagerConfig: {
    executableName: "Rain",
    icon: "public/icons/icon",
    ignore: [
      "electron",
      "node_modules",
      "public",
      "scripts",
      "src",
      ".gitignore",
      "README.md",
      "tsconfig.json",
    ],
    name: "Rain",
    platform: "all",
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Rain",
        title: "Rain",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
