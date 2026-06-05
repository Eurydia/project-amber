import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";

export const QnaCard: FC<{
  data: {
    questions: Array<{ id: string; question: string; visible: boolean }>;
    answer: null | string;
  };
}> = (props) => {
  return (
    <Card variant="outlined">
      <Stack spacing={1}>
        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction={"row"}
              useFlexGap
              sx={{ flexWrap: "nowrap", justifyContent: "space-between" }}
            >
              <Typography
                variant="caption"
                color="textDisabled"
                component={"span"}
              >
                {props.data.questions.length > 1
                  ? `Questions (grouped)`
                  : `Question`}
              </Typography>
              <Chip
                variant={props.data.answer === null ? "outlined" : "filled"}
                color={props.data.answer === null ? "primary" : "success"}
                label={props.data.answer === null ? "WAITING" : "ANSWERED"}
              />
            </Stack>
            <Stack spacing={2}>
              {props.data.questions.map((question, i) => (
                <Stack
                  key={question.id}
                  spacing={1}
                  direction={"row"}
                  useFlexGap
                  sx={{ alignItems: "baseline" }}
                >
                  {props.data.questions.length > 1 && (
                    <Typography variant="caption" color="textDisabled">
                      {`${String.fromCharCode(97 + i)})`}
                    </Typography>
                  )}
                  <Typography
                    color="textSecondary"
                    sx={{ textWrap: "wrap", wordBreak: "break-word" }}
                  >
                    {question.question}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>
        {props.data.answer !== null && (
          <CardContent
            sx={{
              backgroundColor: (t) => t.palette.background.default,
              borderTopStyle: "solid",
              borderTopWidth: 1,
              borderTopColor: (t) => t.palette.divider,
            }}
          >
            <Typography variant="caption" color="success">
              {`Answer`}
            </Typography>
            <Typography
              sx={{ lineBreak: "normal", wordBreak: "auto-phrase" }}
              color="textSecondary"
            >
              {props.data.answer}
            </Typography>
          </CardContent>
        )}
      </Stack>
    </Card>
  );
};
