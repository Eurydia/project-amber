import {
  blue,
  blueGrey,
  brown,
  deepPurple,
  grey,
  orange,
  purple,
  yellow,
} from "@mui/material/colors";
import {
  alpha,
  createTheme,
  lighten,
  responsiveFontSizes,
} from "@mui/material/styles";

export let MAIN_THEME = createTheme({
  colorSchemes: { light: true },
  palette: {
    primary: grey,
    secondary: brown,
    background: { paper: lighten(yellow["50"], 0.15) },
  },
});
MAIN_THEME = responsiveFontSizes(MAIN_THEME);
