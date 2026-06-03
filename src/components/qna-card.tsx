import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";

export const QnaCard: FC<{
  data: { q: string; a: null | string };
}> = (props) => {
  return (
    <Stack spacing={3}>
      <Typography color="secondary" sx={{ fontWeight: 700 }}>
        {`Question`}
      </Typography>
      <Typography color="secondary">{props.data.q}</Typography>
      {props.data.a !== null && (
        <>
          <Divider variant="middle" flexItem>{`🌸`}</Divider>
          <Typography color="secondary" sx={{ fontWeight: 700 }}>
            {`Answer`}
          </Typography>
          <Typography color="secondary">{props.data.a}</Typography>
        </>
      )}
    </Stack>
  );
};
