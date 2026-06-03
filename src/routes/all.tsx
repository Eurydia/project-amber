import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import { GridPatch } from "#/components/grid-patch";
import { QnaCard } from "#/components/qna-card";
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
  return (
    <Container maxWidth="md">
      <GridPatch />
      <Box sx={{ paddingY: 6 }}>
        <Stack spacing={3}>
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
            {`All the Questions!`}
          </Typography>
          <Divider flexItem />
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
      {session !== null && (
        <Tooltip title={"Sign out"}>
          <Fab
            variant="circular"
            color="secondary"
            sx={{ bottom: "16px", right: "16px", position: "fixed" }}
            onClick={() =>
              signOutGoogle({
                onSuccess: async () => {
                  nav({ to: "/" });
                },
              })
            }
          >
            <LogoutIcon />
          </Fab>
        </Tooltip>
      )}
    </Container>
  );
}
