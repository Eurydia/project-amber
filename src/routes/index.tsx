import CheckRounded from "@mui/icons-material/CheckRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import ky from "ky";
import ReactCountDown from "react-countdown";
import { toast } from "react-toastify";
import z from "zod";
import { GridPatch } from "#/components/grid-patch";
import { QRCodeCard } from "#/components/qr-code-card";
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
    defaultValues: {
      question: localStorage.getItem("q-draft") ?? "",
    },
    validators: {
      onChange: z.object({
        question: z.string().normalize().nonempty().max(200),
      }),
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
      <Box sx={{ paddingY: 8 }}>
        <Stack spacing={8}>
          <Paper variant="outlined" sx={{ padding: 6 }}>
            <Stack
              spacing={4}
              direction={"row"}
              sx={{ justifyContent: "space-between" }}
              divider={<Divider flexItem orientation="vertical" />}
            >
              <Stack spacing={2}>
                <ReactCountDown
                  daysInHours
                  zeroPadTime={2}
                  date={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
                  renderer={({ formatted }) => {
                    return (
                      <Typography
                        sx={{ fontFamily: "monospace" }}
                        variant="h2"
                        color="secondary"
                      >
                        {`${formatted.hours}h${formatted.minutes}m${formatted.seconds}s`}
                      </Typography>
                    );
                  }}
                />
                <Typography
                  sx={{ fontFamily: `"Stix two text variable"` }}
                  color="secondary"
                >
                  {`until question closed`}
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Typography
                  sx={{ fontFamily: "monospace" }}
                  variant="h2"
                  color="secondary"
                >
                  {`08/50`}
                </Typography>
                <Typography
                  sx={{ fontFamily: `"Stix two text variable"` }}
                  color="secondary"
                >
                  {`questions asked`}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
          <Stack
            spacing={4}
            component={"form"}
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
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
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: `"Stix two text variable"`,
                      }}
                    >
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
              <form.Subscribe
                selector={({ canSubmit, isValid }) => {
                  return { canSubmit, isValid };
                }}
              >
                {({ canSubmit, isValid }) => (
                  <Button
                    endIcon={<CheckRounded />}
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={!canSubmit || !isValid}
                  >
                    {`Send`}
                  </Button>
                )}
              </form.Subscribe>
            </Toolbar>
          </Stack>

          <QRCodeCard />
        </Stack>
      </Box>
    </Container>
  );
}
