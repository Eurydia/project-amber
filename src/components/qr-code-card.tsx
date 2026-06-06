import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { QRCodeSVG } from "qrcode.react";
import type { FC } from "react";
import { toast } from "react-toastify";

export const QRCodeCard: FC<{
  value: string;
  compact?: boolean;
}> = (props) => {
  const t = useTheme();

  if (props.compact) {
    return (
      <Stack spacing={3}>
        <Typography variant="h3">{`Bring someone with you.`}</Typography>
        <Typography color="textSecondary">
          {`Friends beside you can scan the code. You can also copy the page link and send it directly.`}
        </Typography>
        <Stack
          direction={"row"}
          useFlexGap
          spacing={1}
          sx={{ alignItems: "center", flexWrap: "wrap" }}
        >
          <Typography color="textDisabled" sx={{ fontFamily: "monospace" }}>
            {props.value}
          </Typography>
          <Tooltip title={<Typography>{`Copy link`}</Typography>}>
            <IconButton
              color="primary"
              onClick={() => {
                window.navigator.clipboard
                  .writeText(props.value)
                  .then(() => {
                    toast.success("Link copied");
                  })
                  .catch(() => {
                    toast.error("Couldn't copy link");
                  });
              }}
            >
              <ContentCopyRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
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
      </Stack>
    );
  }

  return (
    <Grid container spacing={{ xs: 3, md: 0 }}>
      <Grid size={{ md: 7.5, sm: 12 }}>
        <Stack spacing={3}>
          <Typography variant="h3">{`Bring someone with you.`}</Typography>
          <Typography color="textSecondary">
            {`Friends beside you can scan the code. You can also copy the page link and send it directly.`}
          </Typography>
          <Stack
            direction={"row"}
            useFlexGap
            spacing={1}
            sx={{ alignItems: "center", flexWrap: "wrap" }}
          >
            <Typography color="textDisabled" sx={{ fontFamily: "monospace" }}>
              {props.value}
            </Typography>
            <Tooltip title={<Typography>{`Copy link`}</Typography>}>
              <IconButton
                color="primary"
                onClick={() => {
                  window.navigator.clipboard
                    .writeText(props.value)
                    .then(() => {
                      toast.success("Link copied");
                    })
                    .catch(() => {
                      toast.error("Couldn't copy link");
                    });
                }}
              >
                <ContentCopyRoundedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Grid>
      <Grid size={{ md: "grow", xs: 12 }}>
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
      </Grid>
    </Grid>
  );
};
