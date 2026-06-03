import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";

export const QnaCard: FC<{
  data: { q: string; a: null | string };
}> = (props) => {
  return (
    <Paper sx={{ padding: 3 }} variant="outlined">
      <Stack spacing={3}>
        <Grid container spacing={3}>
          <Grid size={{ lg: 2 }}>
            <Typography
              variant="caption"
              color="secondary"
              sx={{ fontWeight: 700 }}
            >
              {`Question`}
            </Typography>
          </Grid>
          <Grid size={{ lg: "auto" }}>
            <Typography color="secondary">{props.data.q}</Typography>
          </Grid>
        </Grid>
        {props.data.a !== null && (
          <Grid container spacing={3}>
            <Grid size={{ lg: 2 }}>
              <Typography
                variant="caption"
                color="secondary"
                sx={{ fontWeight: 700 }}
              >
                {`Answer`}
              </Typography>
            </Grid>
            <Grid size={{ lg: "auto" }}>
              <Typography color="secondary">{props.data.a}</Typography>
            </Grid>
          </Grid>
        )}
      </Stack>
    </Paper>
  );
};
