import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "react-toastify";
import { CountdownCard } from "#/components/countdown-card";
import { LoginDialog } from "#/components/form/login-dialog";
import { QNAForm } from "#/components/form/qna.form";
import { GridPatch } from "#/components/grid-patch";
import { QRCodeCard } from "#/components/qr-code-card";
import { QuestionList } from "#/components/question-list";
import { RouterButton } from "#/components/router-button";
import { getServerAuthSession } from "#/integrations/auth/auth";
import { signOutGoogle } from "#/integrations/auth/auth-client";
import {
  getQnaSession,
  getQuestionsFromPerson,
  submitQuestion,
} from "#/server/db";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    const session = await getServerAuthSession();
    return { session };
  },
  loader: async ({ context }) => {
    if (context.session === null) {
      return { data: null };
    }

    const qnaSession = await getQnaSession();
    const submissions = await getQuestionsFromPerson({
      data: { id: context.session.user.email },
    });

    return {
      data: {
        qnaStatus: qnaSession,
        submissions: submissions,
      },
    };
  },
});

function Home() {
  const { session } = Route.useRouteContext();
  const { data } = Route.useLoaderData();
  const router = useRouter();

  const handleSubmit = useServerFn(submitQuestion);

  return (
    <>
      <GridPatch />
      <Toolbar
        sx={{ justifyContent: "space-between", paddingY: 2 }}
        variant="dense"
      >
        <Typography variant="caption">{`P'JENG\`s Q&A \u2022 SUEA TALK 2026`}</Typography>
        {session !== null && (
          <Tooltip title={"Sign out"}>
            <Fab
              color="primary"
              onClick={() =>
                signOutGoogle({
                  onSuccess: async () => {
                    await router.invalidate();
                  },
                })
              }
            >
              <LogoutIcon />
            </Fab>
          </Tooltip>
        )}
      </Toolbar>
      <Container maxWidth="lg">
        <Box sx={{ paddingY: 6 }}>
          {data !== null && (
            <Grid container spacing={3}>
              <Grid size={{ md: 10, xs: 12 }}>
                <CountdownCard status={data.qnaStatus} />
              </Grid>
              <Grid size={{ md: 8, xs: 12 }}>
                <Stack spacing={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <QNAForm
                        limited={data.submissions.length > 5}
                        disabled={!data.qnaStatus.qnaOpen}
                        onSubmit={(value) => {
                          handleSubmit({ data: { question: value } }).then(
                            (res) => {
                              if (!res) {
                                toast.error("Something went wrong :(");
                              } else {
                                toast.success("Question sent!");
                                router.invalidate();
                              }
                            },
                          );
                        }}
                      />
                    </CardContent>
                  </Card>
                  {data.submissions.length > 0 && (
                    <Card variant="outlined">
                      <Stack spacing={3}>
                        <CardContent>
                          <Stack
                            spacing={3}
                            useFlexGap
                            sx={{ alignItems: "flex-start" }}
                          >
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
                          <QuestionList submissions={data.submissions} />
                        </CardContent>
                      </Stack>
                    </Card>
                  )}
                </Stack>
              </Grid>
              <Grid size={{ md: 4, xs: 12 }}>
                <Paper variant="outlined" sx={{ padding: 3 }}>
                  <QRCodeCard compact value={import.meta.env.VITE_APP_ORIGIN} />
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
      <LoginDialog open={session === null} />
    </>
  );
}
