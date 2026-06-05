import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import type { FC } from "react";
import z from "zod";

export const QNAForm: FC<{
  disable: boolean;
  onSubmit: (v: string) => unknown;
}> = (props) => {
  const form = useForm({
    defaultValues: {
      question: "",
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
      spacing={1}
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Stack>
        <Typography variant="caption" color="textSecondary">
          {`QUESTION box`}
        </Typography>
        <Typography variant="h2">{`Send a question`}</Typography>
      </Stack>
      <form.Field name="question">
        {(field) => (
          <TextField
            disabled={props.disable}
            fullWidth
            type="text"
            error={!field.state.meta.isValid}
            onChange={(e) => field.handleChange(e.target.value)}
            value={field.state.value}
            multiline
            minRows={4}
            placeholder={
              props.disable
                ? `There is no active Q&A session. Drop your question here when the question box is accepting questions.`
                : "How's the weather like in Budapest?"
            }
            slotProps={{
              input: {
                sx: {
                  background: props.disable
                    ? `repeating-linear-gradient(-45deg,rgba(135,109,100,.022),rgba(135,109,100,.022) 8px,transparent 8px,transparent 17px),rgba(255,253,244,.56)`
                    : undefined,
                },
                slotProps: {
                  notchedOutline: {
                    sx: {
                      borderStyle: props.disable ? "dashed" : undefined,
                      borderColor: (t) =>
                        props.disable ? t.palette.action.disabled : undefined,
                    },
                  },
                },
              },
              htmlInput: {
                autoCapitalize: "false",
                autoComplete: "false",
                autoCorrect: "false",
                spellCheck: "false",
                sx: {
                  borderStyle: "dashed",
                },
              },
            }}
          />
        )}
      </form.Field>
      <Stack
        direction={"row"}
        useFlexGap
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <form.Subscribe
          selector={({ values }) => {
            return { values };
          }}
        >
          {({ values }) => {
            return (
              <Typography variant="caption" color="textDisabled">
                {`${values.question.length}/200`}
              </Typography>
            );
          }}
        </form.Subscribe>
        <form.Subscribe
          selector={({ canSubmit, isValid }) => {
            return { canSubmit, isValid };
          }}
        >
          {({ canSubmit, isValid }) => (
            <Button
              endIcon={
                !canSubmit || !isValid || props.disable ? (
                  <CancelScheduleSendIcon />
                ) : (
                  <SendIcon />
                )
              }
              variant="contained"
              type="submit"
              disabled={!canSubmit || !isValid || props.disable}
            >
              {"SEND"}
            </Button>
          )}
        </form.Subscribe>
      </Stack>
    </Stack>
  );
};
