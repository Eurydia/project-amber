import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import type { FC } from "react";
import z from "zod";

export const QNAForm: FC<{
  onSubmit: (v: string) => unknown;
}> = (props) => {
  const form = useForm({
    defaultValues: {
      question: localStorage.getItem("q-draft") ?? "",
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: z.object({
        question: z.string().normalize().nonempty().max(200),
      }),
    },
    onSubmit: async ({ value }) => {
      return props.onSubmit(value.question);
    },
  });
  return (
    <Stack
      spacing={3}
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Typography color="secondary" sx={{ fontWeight: 700 }}>
        {`Question`}
      </Typography>
      <form.Field
        name="question"
        listeners={{
          onChangeDebounceMs: 750,
          onChange: ({ value }) => {
            localStorage.setItem("q-draft", value);
          },
        }}
      >
        {(field) => (
          <TextField
            fullWidth
            type="text"
            error={!field.state.meta.isValid}
            onChange={(e) => field.handleChange(e.target.value)}
            value={field.state.value}
            multiline
            minRows={4}
            helperText={
              <Typography variant="caption">
                {`${field.state.value.length}/200`}
              </Typography>
            }
            placeholder="How's the weather"
            slotProps={{
              htmlInput: {
                autoCapitalize: "false",
                autoComplete: "false",
                autoCorrect: "false",
                spellCheck: "false",
              },
            }}
          />
        )}
      </form.Field>
      <Toolbar
        disableGutters
        variant="dense"
        sx={{ justifyContent: "flex-end" }}
      >
        <form.Subscribe
          selector={({ canSubmit, isValid }) => {
            return { canSubmit, isValid };
          }}
        >
          {({ canSubmit, isValid }) => (
            <Button
              endIcon={
                !canSubmit || !isValid ? (
                  <CancelScheduleSendIcon />
                ) : (
                  <SendIcon />
                )
              }
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!canSubmit || !isValid}
            >
              {"Send question"}
            </Button>
          )}
        </form.Subscribe>
      </Toolbar>
    </Stack>
  );
};
