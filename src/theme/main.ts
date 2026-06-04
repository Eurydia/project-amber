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
      main: "#66836D",
      light: "#98AD9D",
      dark: "#48604F",
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
    fontFamily: '"DM Sans", sans-serif',

    h1: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
      letterSpacing: "-0.085em",
    },

    h2: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
      letterSpacing: "-0.055em",
    },

    h3: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
      letterSpacing: "-0.05em",
    },

    caption: {
      fontWeight: 700,
      letterSpacing: "0.17em",
      textTransform: "uppercase",
    },

    button: {
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
  },
});

MAIN_THEME = responsiveFontSizes(MAIN_THEME);

export { MAIN_THEME };
