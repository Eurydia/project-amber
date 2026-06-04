import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "react-toastify";
import { CountdownCard } from "#/components/countdown-card";
import { LoginDialog } from "#/components/form/login-dialog";
import { QNAForm } from "#/components/form/qna.form";
import { GridPatch } from "#/components/grid-patch";
import { QnaCard } from "#/components/qna-card";
import { QRCodeCard } from "#/components/qr-code-card";
import { RouterButton } from "#/components/router-button";
import { getServerAuthSession } from "#/integrations/auth/auth";
import { signOutGoogle } from "#/integrations/auth/auth-client";
import { getQnaSession, getQuestions, submitQuestion } from "#/server/db";

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
    const res = await getQuestions({
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
      <Container maxWidth="md">
        <GridPatch />
        <Box sx={{ paddingY: 6 }}>
          <Stack spacing={6}>
            <Typography
              variant="h1"
              sx={{
                fontStyle: "italic",
                textDecorationLine: "underline",
                textDecorationStyle: "double",
                textDecorationColor: (t) => t.palette.secondary.light,
                color: (t) => t.palette.secondary.main,
                textAlign: "center",
              }}
            >
              {`Send a Question!`}
            </Typography>
            {data !== null && <CountdownCard status={data.qnaStatus} />}
            {data !== null && (
              <Paper sx={{ padding: 6 }} variant="outlined">
                <QNAForm
                  onSubmit={(value) => {
                    handleSubmit({ data: { question: value } }).then((res) => {
                      if (!res) {
                        toast.error("ERR");
                      } else {
                        toast.success("OK");
                        router.invalidate();
                      }
                    });
                  }}
                />
              </Paper>
            )}
            {data !== null && (
            {data !== null && data.submissions.length > 0 && (
              <Paper sx={{ padding: 6 }} variant="outlined">
                <Stack spacing={3}>
                  <Stack
                    direction={"row"}
                    sx={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      color="secondary"
                      variant="caption"
                      sx={{ fontWeight: 700 }}
                    >
                      {`My question(s)`}
                    </Typography>
                    <RouterButton
                      color="secondary"
                      to="/all"
                      variant="text"
                      size="small"
                      endIcon={<ArrowRightAltRoundedIcon />}
                    >
                      {`See other questions`}
                    </RouterButton>
                  </Stack>
                  {data.submissions.map((sub) => (
                    <QnaCard key={sub.id} data={sub} />
                  ))}
                </Stack>
              </Paper>
            )}
            <QRCodeCard />
          </Stack>
        </Box>
      </Container>
      <LoginDialog open={session === null} />
      {session !== null && (
        <Tooltip title={"Sign out"}>
          <Fab
            variant="circular"
            color="secondary"
            sx={{ bottom: "16px", right: "16px", position: "fixed" }}
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
    </>
  );
}
