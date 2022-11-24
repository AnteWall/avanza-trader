export enum Platform {
  Windows = "win32",
  Mac = "darwin",
  Linux = "linux",
}

export function getOS() {
  const platform = window.navigator.platform;
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];

  if (macosPlatforms.indexOf(platform) !== -1) {
    return Platform.Mac;
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    return Platform.Windows;
  } else if (/Linux/.test(platform)) {
    return Platform.Linux;
  }

  return Platform.Windows;
}
