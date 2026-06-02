import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export let MAIN_THEME = createTheme();
MAIN_THEME = responsiveFontSizes(MAIN_THEME);
