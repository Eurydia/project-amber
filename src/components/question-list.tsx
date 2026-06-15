import Stack from "@mui/material/Stack";
import type { FC } from "react";
import { QnaCard } from "./qna-card";

export const QuestionList: FC<{
  submissions: Array<{
    id: string | number;
    questions: Array<{
      question: string;
      id: string | number;
      visible: boolean;
    }>;
    answer: string | null;
  }>;
}> = (props) => {
  return (
    <Stack spacing={3}>
      {props.submissions.map((entry) => (
        <QnaCard key={entry.id} data={entry} />
      ))}
    </Stack>
  );
};
