import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import type { FC } from "react";
import Countdown from "react-countdown";
import { StatusDot } from "./status-dot";

export const CountdownCard: FC<{
  status:
    | {
        qnaOpen: true;
        openUntil: Date;
      }
    | {
        qnaOpen: false;
        openAt: null | Date;
      };
}> = (props) => {
  return (
    <>
      {props.status.qnaOpen ? (
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Stack spacing={2} direction={"row"} sx={{ alignItems: "center" }}>
              <StatusDot />
              <Typography variant="caption" color="textSecondary">
                {`Questions are now being accepted`}
              </Typography>
            </Stack>
            <span>
              <Typography variant="h1" component={"span"}>
                {`The question box is `}
              </Typography>
              <Typography
                variant="h1"
                component={"span"}
                color="textDisabled"
                sx={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "double",
                  textDecorationColor: (t) => t.palette.text.disabled,
                }}
              >
                {`open.`}
              </Typography>
            </span>
          </Stack>
          <Paper variant="outlined" sx={{ padding: 3 }}>
            <Stack spacing={3}>
              <Stack
                direction={"row"}
                useFlexGap
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography variant="caption" color="textSecondary">
                  {`Question box closes in`}
                </Typography>
                <Chip color="success" variant="outlined" label={`OPEN`} />
              </Stack>
              <Grid container spacing={{ xs: 3, md: 0 }}>
                <Grid size={{ md: 7.5, sm: 12 }}>
                  <Countdown
                    autoStart
                    date={props.status.openUntil}
                    renderer={({ formatted }) => {
                      return (
                        <Stack
                          direction={"row"}
                          spacing={3}
                          divider={
                            <Typography variant="h3" color="textDisabled">
                              {`:`}
                            </Typography>
                          }
                          sx={{ alignItems: "baseline" }}
                        >
                          <Stack sx={{ alignItems: "flex-start" }}>
                            <Typography variant="h2">
                              {formatted.hours}
                            </Typography>
                            <Typography variant="caption" color="textDisabled">
                              {`Hours`}
                            </Typography>
                          </Stack>
                          <Stack sx={{ alignItems: "flex-start" }}>
                            <Typography variant="h2">
                              {formatted.minutes}
                            </Typography>
                            <Typography variant="caption" color="textDisabled">
                              {`Minutes`}
                            </Typography>
                          </Stack>
                          <Stack sx={{ alignItems: "flex-start" }}>
                            <Typography variant="h2">
                              {formatted.seconds}
                            </Typography>
                            <Typography variant="caption" color="textDisabled">
                              {`seconds`}
                            </Typography>
                          </Stack>
                        </Stack>
                      );
                    }}
                  />
                </Grid>
                <Grid
                  size={{ md: "grow", xs: 12 }}
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography color="textDisabled" variant="caption">
                    {`At ${dayjs(props.status.openUntil).format("HH:mm")} \u2022 UTC+7`}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      ) : props.status.openAt === null ? (
        <Stack spacing={3}>
          <Stack
            useFlexGap
            spacing={2}
            direction={"row"}
            sx={{ alignItems: "center" }}
          >
            <StatusDot />
            <Typography variant="caption" color="textSecondary">
              {`Nothing scheduled right now`}
            </Typography>
          </Stack>
          <span>
            <Typography variant="h1" component={"span"}>
              {`The question box is `}
            </Typography>
            <Typography
              variant="h1"
              component={"span"}
              color="textDisabled"
              sx={{
                textDecorationLine: "underline",
                textDecorationStyle: "double",
                textDecorationColor: (t) => t.palette.text.disabled,
              }}
            >
              {`resting.`}
            </Typography>
          </span>
          <Typography>
            {`There is no upcoming Q&A at the moment. This page will become active
            again when the next session is scheduled.`}
          </Typography>
        </Stack>
      ) : dayjs(props.status.openAt).diff(Date.now(), "hour") > 24 ? (
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Stack spacing={2} direction={"row"} sx={{ alignItems: "center" }}>
              <StatusDot />
              <Typography variant="caption" color="textSecondary">
                {`A new session is scheduled`}
              </Typography>
            </Stack>
            <span>
              <Typography variant="h1" component={"span"}>
                {`Questions will be `}
              </Typography>
              <Typography
                variant="h1"
                component={"span"}
                color="textDisabled"
                sx={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "double",
                  textDecorationColor: (t) => t.palette.text.disabled,
                }}
              >
                {`welcomed.`}
              </Typography>
            </span>
          </Stack>
          <Paper variant="outlined" sx={{ padding: 3 }}>
            <Stack spacing={3}>
              <Stack
                direction={"row"}
                useFlexGap
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography variant="caption" color="textSecondary">
                  {`Next Q&A SESSION`}
                </Typography>
                <Chip color="primary" variant="outlined" label={`SCHEDULED`} />
              </Stack>
              <Grid container spacing={{ xs: 3, md: 0 }}>
                <Grid size={{ md: 7.5, sm: 12 }}>
                  <Stack>
                    <Typography variant="h2" component={"span"}>
                      {dayjs(props.status.openAt).format("dddd, DD MMMM YYYY")}
                    </Typography>
                    <Typography
                      variant="h2"
                      component={"span"}
                      color="textDisabled"
                    >
                      {dayjs(props.status.openAt).format("HH:mm")}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  size={{ md: "grow", xs: 12 }}
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography color="textDisabled" variant="caption">
                    {`Questions open later`}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      ) : (
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Stack spacing={2} direction={"row"} sx={{ alignItems: "center" }}>
              <StatusDot />
              <Typography variant="caption" color="textSecondary">
                {`The next session is less than 24 hours away`}
              </Typography>
            </Stack>
            <span>
              <Typography variant="h1" component={"span"}>
                {`The question box is almost `}
              </Typography>
              <Typography
                variant="h1"
                component={"span"}
                color="textDisabled"
                sx={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "double",
                  textDecorationColor: (t) => t.palette.text.disabled,
                }}
              >
                {`open.`}
              </Typography>
            </span>
          </Stack>
          <Paper variant="outlined" sx={{ padding: 3 }}>
            <Stack spacing={3}>
              <Stack
                direction={"row"}
                useFlexGap
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography variant="caption" color="textSecondary">
                  {`Next Q&A SESSION`}
                </Typography>
                <Chip color="primary" variant="outlined" label={`SCHEDULED`} />
              </Stack>
              <Grid container spacing={{ xs: 3, md: 0 }}>
                <Grid size={{ md: 7.5, sm: 12 }}>
                  <Stack>
                    <Typography variant="caption" color="textDisabled">
                      {`Question box open in`}
                    </Typography>
                    <Countdown
                      autoStart
                      date={props.status.openAt}
                      renderer={({ formatted }) => {
                        return (
                          <Stack
                            direction={"row"}
                            spacing={3}
                            divider={
                              <Typography variant="h3" color="textDisabled">
                                {`:`}
                              </Typography>
                            }
                            sx={{ alignItems: "baseline" }}
                          >
                            <Stack sx={{ alignItems: "flex-start" }}>
                              <Typography variant="h2">
                                {formatted.hours}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textDisabled"
                              >
                                {`Hours`}
                              </Typography>
                            </Stack>
                            <Stack sx={{ alignItems: "flex-start" }}>
                              <Typography variant="h2">
                                {formatted.minutes}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textDisabled"
                              >
                                {`Minutes`}
                              </Typography>
                            </Stack>
                            <Stack sx={{ alignItems: "flex-start" }}>
                              <Typography variant="h2">
                                {formatted.seconds}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textDisabled"
                              >
                                {`seconds`}
                              </Typography>
                            </Stack>
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid
                  size={{ md: "grow", xs: 12 }}
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography color="textDisabled" variant="caption">
                    {`At ${dayjs(props.status.openAt).format("HH:mm")} \u2022 UTC+7`}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      )}
    </>
  );
};
