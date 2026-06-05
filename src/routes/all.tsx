import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import z from "zod";
import { GridPatch } from "#/components/grid-patch";
import { QnaCard } from "#/components/qna-card";
import { RouterButton } from "#/components/router-button";
import { getServerAuthSession } from "#/integrations/auth/auth";
import { signOutGoogle } from "#/integrations/auth/auth-client";
import { getAggregatedQuestions } from "#/server/db";

export const Route = createFileRoute("/all")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getServerAuthSession();
    return { session };
  },
  validateSearch: z
    .object({ page: z.number().int().nonnegative() })
    .partial()
    .optional(),
  loaderDeps: ({ search }) => {
    return { search };
  },
  loader: async ({ context, deps }) => {
    if (context.session === null) {
      throw redirect({ to: "/" });
    }

    const res = await getAggregatedQuestions({
      data: { page: deps.search?.page ?? 0 },
    });
    return res;
  },
});

function RouteComponent() {
  const { result, currPageIndex, totalPageCount } = Route.useLoaderData();
  const nav = Route.useNavigate();
  const { session } = Route.useRouteContext();
  const router = useRouter();
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
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Stack>
            <Typography variant="caption" color="textSecondary">
              {`Questions from the room`}
            </Typography>
            <span>
              <Typography component={"span"} variant="h1">
                {`All the `}
              </Typography>
              <Typography
                component={"span"}
                color="textSecondary"
                variant="h1"
                sx={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "double",
                  textDecorationColor: (t) => t.palette.text.secondary,
                }}
              >
                {`questions.`}
              </Typography>
            </span>
          </Stack>
          <Stack direction={"row"} sx={{ alignItems: "flex-start" }}>
            <RouterButton
              disableTouchRipple
              variant="contained"
              to="/"
              startIcon={<KeyboardBackspaceRoundedIcon />}
            >
              {`Back to my questions`}
            </RouterButton>
          </Stack>
        </Stack>
        <Box sx={{ paddingY: 6 }}>
          <Stack spacing={3}>
            {result.length === 0 ? (
              <Typography variant="caption" color="secondary">
                {`Nothing to see here...`}
              </Typography>
            ) : (
              result.map((sub) => (
                <Box key={sub.answer}>
                  <QnaCard data={sub} />
                </Box>
              ))
            )}
            <Toolbar
              disableGutters
              variant="dense"
              sx={{ justifyContent: "center" }}
            >
              <Pagination
                count={totalPageCount}
                defaultPage={currPageIndex + 1}
                onChange={(_, page) => {
                  nav({ to: "/all", search: { page: page - 1 } });
                }}
              />
            </Toolbar>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
