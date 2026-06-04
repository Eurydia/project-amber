import { useTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import { ToastContainer } from "react-toastify";

export function ThemedToastContainer() {
  const theme = useTheme();

  return (
    <ToastContainer
      theme="light"
      style={
        {
          "--toastify-font-family": theme.typography.fontFamily,

          "--toastify-color-light": theme.palette.background.paper,
          "--toastify-toast-background": theme.palette.background.paper,
          "--toastify-text-color-light": theme.palette.text.primary,

          "--toastify-color-info": theme.palette.primary.main,
          "--toastify-color-success": theme.palette.success.main,
          "--toastify-color-warning": theme.palette.primary.light,
          "--toastify-color-error": theme.palette.error.main,

          "--toastify-icon-color-info": theme.palette.primary.main,
          "--toastify-icon-color-success": theme.palette.success.main,
          "--toastify-icon-color-warning": theme.palette.primary.light,
          "--toastify-icon-color-error": theme.palette.error.main,

          "--toastify-color-progress-light": theme.palette.primary.main,
          "--toastify-color-progress-info": theme.palette.primary.main,
          "--toastify-color-progress-success": theme.palette.success.main,
          "--toastify-color-progress-warning": theme.palette.primary.light,
          "--toastify-color-progress-error": theme.palette.error.main,

          "--toastify-spinner-color": theme.palette.primary.main,
          "--toastify-spinner-color-empty-area": theme.palette.divider,

          "--toastify-toast-shadow": `0 4px 12px ${theme.alpha(
            theme.palette.primary.dark,
            0.12,
          )}`,
        } as CSSProperties
      }
    />
  );
}
