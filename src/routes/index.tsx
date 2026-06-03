import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import ky from "ky";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";
import { CountdownCard } from "#/components/countdown-card";
import { LoginDialog } from "#/components/form/login-dialog";
import { QNAForm } from "#/components/form/qna.form";
import { GridPatch } from "#/components/grid-patch";
import { QnaCard } from "#/components/qna-card";
import { QRCodeCard } from "#/components/qr-code-card";
import { getSession } from "#/integrations/auth/auth";
import { signOutGoogle } from "#/integrations/auth/auth-client";
import { QuestionStatusSchema } from "#/types/schemas/question";

export const Route = createFileRoute("/")({
  ssr: "data-only",
  component: Home,
  loader: async ({ context }) => {
    if (context.session === null) {
      return { data: null };
    }
    return {
      data: await ky
        .get("/api/q", { baseUrl: "http://localhost:3000" })
        .json(QuestionStatusSchema),
    };
  },
  beforeLoad: async () => {
    const session = await getSession();
    return { session };
  },
});

function Home() {
  const { session } = Route.useRouteContext();
  const { data } = Route.useLoaderData();
  const router = useRouter();
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
              }}
            >
              {`Send a Question!`}
            </Typography>
            {data !== null && <CountdownCard status={data.qnaStatus} />}
            {data !== null && (
              <Paper sx={{ padding: 6 }} variant="outlined">
                {data.submission.q === null ? (
                  <QNAForm
                    onSubmit={(value) =>
                      ky
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
                        })
                    }
                  />
                ) : (
                  <QnaCard data={data.submission} />
                )}
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
