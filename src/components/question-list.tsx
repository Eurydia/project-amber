import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { QnaCard } from "./qna-card";
import { RouterButton } from "./router-button";

export const QuestionList: FC<{
  submissions: Array<{
    id: string;
    questions: Array<{ question: string; id: string }>;
    answer: string | null;
  }>;
}> = (props) => {
  return (
    <Card variant="outlined">
      <Stack spacing={3}>
        <CardContent>
          <Stack spacing={3} useFlexGap sx={{ alignItems: "flex-start" }}>
            <Typography variant="h2">{`My questions`}</Typography>
            <RouterButton
              disableTouchRipple
              variant="outlined"
              endIcon={<ArrowRightAltRoundedIcon />}
              to="/all"
            >
              {`SEE OTHER QUESTIONS`}
            </RouterButton>
          </Stack>
        </CardContent>
        <Divider flexItem />
        <CardContent>
          <Stack spacing={3}>
            {props.submissions.map((entry) => (
              <QnaCard key={entry.id} data={entry} />
            ))}
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};
