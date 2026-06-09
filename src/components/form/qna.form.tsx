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
  onSubmit: (v: string) => unknown;
  limited?: boolean;
  disabled?: boolean;
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
    onSubmit: async ({ value,formApi }) => {
      formApi.reset();
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
            disabled={props.limited || props.disabled}
            fullWidth
            type="text"
            error={!field.state.meta.isValid}
            onChange={(e) => field.handleChange(e.target.value)}
            value={field.state.value}
            multiline
            minRows={4}
            placeholder={
              props.limited
                ? "You cannot send another question in this session. Your existing questions will stay visible below, including any answers that are added later."
                : props.disabled
                  ? `There is no active Q&A session. Drop your question here when the question box is open.`
                  : "How's the weather like in Budapest?"
            }
            slotProps={{
              input: {
                sx: {
                  background:
                    props.disabled || props.limited
                      ? `repeating-linear-gradient(-45deg,rgba(135,109,100,.022),rgba(135,109,100,.022) 8px,transparent 8px,transparent 17px),rgba(255,253,244,.56)`
                      : undefined,
                },
                slotProps: {
                  notchedOutline: {
                    sx: {
                      borderStyle:
                        props.disabled || props.limited ? "dashed" : undefined,
                      borderColor: (t) =>
                        props.disabled || props.limited
                          ? t.palette.action.disabled
                          : undefined,
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
                !canSubmit || !isValid || props.disabled || props.limited ? (
                  <CancelScheduleSendIcon />
                ) : (
                  <SendIcon />
                )
              }
              variant="contained"
              type="submit"
              disabled={
                !canSubmit || !isValid || props.disabled || props.limited
              }
            >
              {"SEND"}
            </Button>
          )}
        </form.Subscribe>
      </Stack>
    </Stack>
  );
};
