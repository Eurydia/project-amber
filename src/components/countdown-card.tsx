import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import type { FC } from "react";
import ReactCountDown from "react-countdown";

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
    <Paper variant="outlined" sx={{ padding: 6 }}>
      {props.status.qnaOpen ? (
        <Stack spacing={2}>
          <Typography variant="caption" color="secondary">
            {`Q&A will stop accepting questions in`}
          </Typography>
          <ReactCountDown
            daysInHours
            zeroPadTime={2}
            date={props.status.openUntil}
            renderer={({ formatted }) => {
              return (
                <Typography
                  sx={{ fontFamily: "monospace" }}
                  color="secondary"
                  variant="h2"
                  component={"div"}
                >
                  {`${formatted.hours}h ${formatted.minutes}m ${formatted.seconds}s`}
                </Typography>
              );
            }}
          />
        </Stack>
      ) : props.status.openAt === null ? (
        <Typography variant="h2" color="secondary" component={"div"}>
          {`Q&A is closed. It won't be accepting questions anytime soon.🚧`}
        </Typography>
      ) : dayjs(props.status.openAt).diff(Date.now(), "hour") > 24 ? (
        <Stack spacing={2}>
          <Typography variant="caption" color="secondary">
            {`Q&A start accepting questions on`}
          </Typography>
          <Typography
            sx={{ fontFamily: "monospace" }}
            color="secondary"
            variant="h2"
            component={"div"}
          >
            {dayjs(props.status.openAt).format("DD MMMM YYYY @ HH:mm A")}
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Typography variant="caption" color="secondary">
            {`Q&A will start accepting questions in`}
          </Typography>
          <ReactCountDown
            daysInHours
            zeroPadTime={2}
            date={new Date(props.status.openAt)}
            renderer={({ formatted }) => {
              return (
                <Typography
                  sx={{ fontFamily: "monospace" }}
                  color="secondary"
                  variant="h2"
                  component={"div"}
                >
                  {`${formatted.hours}h ${formatted.minutes}m ${formatted.seconds}s`}
                </Typography>
              );
            }}
          />
        </Stack>
      )}
    </Paper>
  );
};
