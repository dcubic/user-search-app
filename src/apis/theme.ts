interface Theme {
  "background-color": string,
  "container-color": string,
  "title-color": string,
  "theme-toggle-color": string,
  "toggle-hover-color": string,
  "internal-text-color": string,
  "body-title-color": string
}

export const darkTheme: Theme = {
    "background-color": "#141D2F",
    "container-color": "#1E2A47",
    "title-color": "white",
    "theme-toggle-color": "white",
    "toggle-hover-color": "#90A4D4",
    "internal-text-color": "white",
    "body-title-color": "white"
}

export const lightTheme: Theme = {
    "background-color": "#F6F8FF",
    "container-color": "#FEFEFE",
    "title-color": "#222731",
    "theme-toggle-color": "#4B6A9B",
    "toggle-hover-color": "#222731",
    "internal-text-color": "#697C9A",
    "body-title-color": "#2B3442"
}