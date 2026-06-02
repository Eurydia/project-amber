import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import ky from "ky";
import { toast } from "react-toastify";
import z from "zod";
import { GridPatch } from "#/components/grid-patch";
import { QuestionStatusSchema } from "#/types/schemas/question";

export const Route = createFileRoute("/")({
  ssr: "data-only",
  component: Home,
  loader: async () => {
    const res = await ky
      .get("/admin/api/q", {
        baseUrl: import.meta.env.VITE_APP_ORIGIN,
        timeout: 5_000,
        retry: { limit: 2 },
      })
      .json(QuestionStatusSchema);
    console.debug(res);
    return { data: res };
  },
});

function Home() {
  const form = useForm({
    defaultValues: { question: localStorage.getItem("q-draft") ?? "" },
    validators: {
      onChange: z.object({
        question: z.string().normalize().nonempty().max(200),
      }),
    },
    listeners: {
      onChangeDebounceMs: 500,
      onChange: ({ formApi }) => {
        localStorage.setItem("q-draft", formApi.state.values.question);
      },
    },
    onSubmit: async ({ value }) => {
      return ky
        .post("/admin/api/q", {
          baseUrl: import.meta.env.VITE_APP_ORIGIN,
          json: value,
        })
        .then((res) => {
          toast.success("OK");
          return res;
        })
        .catch((res) => {
          toast.warn("Failed");
          return res;
        });
    },
  });

  return (
    <Container maxWidth="md">
      <GridPatch />
      <Box sx={{ paddingY: 4 }}>
        <Stack spacing={8}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: `"Stix Two Text Variable"`,
              fontStyle: "italic",
              textDecorationLine: "underline",
              textDecorationStyle: "double",
              textDecorationColor: (t) => t.palette.secondary.light,
              color: (t) => t.palette.secondary.main,
            }}
          >
            {`Send a Question!`}
          </Typography>
          <Stack
            spacing={4}
            component={"form"}
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="question">
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
                    <Typography variant="caption" fontFamily={"monospace"}>
                      {`${field.state.value.length}/200`}
                    </Typography>
                  }
                  placeholder="How's the weather"
                  slotProps={{
                    input: {
                      sx: {
                        backgroundColor: (t) => t.palette.background.paper,
                        color: (t) => t.palette.primary.contrastText,
                      },
                    },
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
              <Button variant="contained" type="submit" color="secondary">
                {`Send`}
              </Button>
            </Toolbar>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
