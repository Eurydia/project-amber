import Box from "@mui/material/Box";
import type { FC } from "react";

export const StatusDot: FC = () => {
  return (
    <Box
      sx={(theme) => ({
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: theme.palette.primary.main,
        boxShadow: `0 0 0 8px ${theme.alpha(theme.palette.primary.main, 0.12)}`,
      })}
    />
  );
};
