import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
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
import { getServerAuthSession } from "#/integrations/auth/auth";
import { signOutGoogle } from "#/integrations/auth/auth-client";
import {
  getQnaSession,
  getQuestionsFromPerson,
  submitQuestion,
} from "#/server/db";

export const Route = createFileRoute("/")({
  ssr: false,
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
    const res = await getQuestionsFromPerson({
      data: { id: context.session.user.email },
    });

    return {
      data: {
        qnaStatus: qnaSession,
        submissions: res,
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
                                toast.error("ERR");
                              } else {
                                toast.success("OK");
                                router.invalidate();
                              }
                            },
                          );
                        }}
                      />
                    </CardContent>
                  </Card>
                  {data.submissions.length > 0 && (
                    <QuestionList submissions={data.submissions} />
                  )}
                </Stack>
              </Grid>
              <Grid size={{ md: 4, xs: 12 }}>
                <Paper variant="outlined" sx={{ padding: 3 }}>
                  <QRCodeCard compact value={window.location.href} />
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
