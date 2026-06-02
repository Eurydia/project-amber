import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { QRCodeSVG } from "qrcode.react";
import type { FC } from "react";
import { toast } from "react-toastify";

export const QRCodeCard: FC = () => {
  return (
    <Paper variant="outlined" sx={{ padding: 6 }}>
      <Stack spacing={6} sx={{ alignItems: "center" }}>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: `"Stix two text variable"`,
            color: (t) => t.palette.secondary.main,
            fontWeight: 600,
            fontSize: "x-large",
          }}
          component={"span"}
        >
          <span>{`Share with friends beside you! `}</span>
          <span>{`Or `}</span>
          <Typography
            component={"span"}
            sx={{
              textDecorationLine: "underline",
              textDecorationStyle: "double",
              textDecorationColor: (t) => t.palette.secondary.light,
              color: (t) => t.palette.secondary.main,
              fontWeight: 600,
              fontSize: "x-large",
              fontFamily: `"Stix two text variable"`,
              cursor: "pointer",
              fontStyle: "italic",
            }}
            onClick={() => {
              window.navigator.clipboard
                .writeText(window.location.href)
                .then(() => {
                  toast.info("URL copied to clipboard!");
                })
                .catch(() => {
                  toast.error("Couldn't copy URL to clipboard :(");
                });
            }}
          >
            {`click me`}
          </Typography>
          <span>{` to copy the link to this page.`}</span>
        </Typography>
        <QRCodeSVG
          value={window.location.href}
          level="H"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            maxWidth: "min(50dvw, 50dvh)",
          }}
        />
      </Stack>
    </Paper>
  );
};
