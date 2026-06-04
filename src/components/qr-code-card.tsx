import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { QRCodeSVG } from "qrcode.react";
import type { FC } from "react";

export const QRCodeCard: FC<{ value: string }> = (props) => {
  const t = useTheme();
  return (
    <Paper variant="outlined" sx={{ padding: 3 }}>
      <QRCodeSVG
        bgColor={t.palette.background.paper}
        value={props.value}
        level="H"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          maxWidth: "min(50dvw, 50dvh)",
        }}
      />
    </Paper>
  );
};
