import { brown, grey, yellow } from "@mui/material/colors";
import {
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
