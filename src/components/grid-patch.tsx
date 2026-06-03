import Box from "@mui/material/Box";
import type { FC } from "react";

export const GridPatch: FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundPositionX: 24,
        backgroundPositionY: 24,
        zIndex: -1,
        pointerEvents: "none",
        bgcolor: (t) => t.palette.background.paper,
        backgroundImage: (t) => {
          const lineColor = t.alpha(t.palette.secondary.main, 0.2);
          return `
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `;
        },
        backgroundSize: "100px 100px",
      }}
    />
  );
};
