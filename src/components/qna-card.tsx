import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, Fragment } from "react";

export const QnaCard: FC<{
  data: {
    questions: Array<{ id: string; question: string }>;
    answer: null | string;
  };
}> = (props) => {
  return (
    <Paper sx={{ padding: 3 }} variant="outlined">
      <Stack spacing={3}>
        <Grid container spacing={3}>
          {props.data.questions.map((question) => (
            <Fragment key={question.id}>
              <Grid size={{ lg: 2 }}>
                <Typography
                  variant="caption"
                  color="secondary"
                  sx={{ fontWeight: 700, textAlign: "right" }}
                >
                  {`Question`}
                </Typography>
              </Grid>
              <Grid size={{ lg: 10 }}>
                <Typography color="secondary">{question.question}</Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
        {props.data.answer !== null && (
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
            <Grid size={{ lg: 10 }}>
              <Typography color="secondary">{props.data.answer}</Typography>
            </Grid>
          </Grid>
        )}
      </Stack>
    </Paper>
  );
};
