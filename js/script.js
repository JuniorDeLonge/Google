class DarkModeHandler {
  constructor() {
    this.applyDarkMode = this.applyDarkMode.bind(this);
  }

  applyDarkMode() {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const userPrefersDarkMode = localStorage.getItem("darkMode") === "true";

    document.body.classList.toggle(
      "dark-mode",
      prefersDarkMode || userPrefersDarkMode
    );
  }

  saveDarkModePreference() {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    localStorage.setItem("darkMode", prefersDarkMode);
  }

  init() {
    this.applyDarkMode();

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        this.saveDarkModePreference();
        this.applyDarkMode();
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const darkModeHandler = new DarkModeHandler();
  darkModeHandler.init();
});
