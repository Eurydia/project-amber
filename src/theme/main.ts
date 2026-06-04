import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let MAIN_THEME = createTheme({
  colorSchemes: { light: true },
  palette: {
    primary: {
      main: "#8D7168",
      light: "#A48C82",
      dark: "#674E47",
      contrastText: "#FBF7E8",
    },
    success: {
      main: "#738060",
      light: "#A4AF91",
      dark: "#536044",
      contrastText: "#FFFDF4",
    },
    background: {
      default: "#FBF7E8",
      paper: "#FFFDF4",
    },
    text: {
      primary: "#674E47",
      secondary: "#876D64",
      disabled: "#A48C82",
    },
    divider: "rgba(135, 109, 100, 0.18)",
    action: {
      hover: "rgba(135, 109, 100, 0.08)",
      selected: "rgba(135, 109, 100, 0.12)",
      disabled: "rgba(103, 78, 71, 0.56)",
      disabledBackground: "rgba(141, 113, 104, 0.15)",
      focus: "rgba(135, 109, 100, 0.26)",
    },
  },
  typography: {
    fontFamily: '"DM Sans variable", sans-serif',
    h1: {
      fontFamily: '"Fraunces variable", Georgia, serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Fraunces variable", Georgia, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Fraunces variable", Georgia, serif',
      fontWeight: 600,
    },
    caption: {
      fontWeight: 700,
      textTransform: "uppercase",
    },
    button: {
      fontWeight: 700,
      textTransform: "uppercase",
    },
  },
});

MAIN_THEME = responsiveFontSizes(MAIN_THEME);

export { MAIN_THEME };
