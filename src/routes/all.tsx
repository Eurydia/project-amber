import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { GridPatch } from "#/components/grid-patch";
import { QnaCard } from "#/components/qna-card";
import { getAggregatedQuestions } from "#/server/db";
import {
  EVENT_NAME,
  getCanonicalUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "#/utils/seo";

export const Route = createFileRoute("/all")({
  head: () => ({
    meta: [
      {
        title: SITE_TITLE,
      },
      {
        name: "description",
        content: SITE_DESCRIPTION,
      },
      {
        property: "og:title",
        content: SITE_TITLE,
      },
      {
        property: "og:description",
        content: SITE_DESCRIPTION,
      },
      {
        property: "og:url",
        content: getCanonicalUrl("/all"),
      },
      {
        name: "twitter:title",
        content: SITE_TITLE,
      },
      {
        name: "twitter:description",
        content: SITE_DESCRIPTION,
      },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "QAPage",
          name: SITE_TITLE,
          about: EVENT_NAME,
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: getCanonicalUrl("/all"),
          },
          description: SITE_DESCRIPTION,
        },
      },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/all") }],
  }),
  component: RouteComponent,
  beforeLoad: async () => {
    // const session = await getServerAuthSession();
    // if (session === null) {
    //   throw redirect({ to: "/" });
    // }
    // const submissions = await getQuestionsFromPerson({
    //   data: { id: session.user.email },
    // });
    // if (import.meta.env.PROD && submissions.length === 0) {
    //   throw redirect({ to: "/" });
    // }
    // return { session };
  },
  // validateSearch: z
  //   .object({ page: z.number().int().nonnegative() })
  //   .partial()
  //   .optional(),
  // loaderDeps: ({ search }) => {
  //   return { search };
  // },
  loader: async () => {
    const res = await getAggregatedQuestions();
    return { result: res };
  },
});

function RouteComponent() {
  const { result } = Route.useLoaderData();
  // const nav = Route.useNavigate();
  // const { session } = Route.useRouteContext();
  // const router = useRouter();
  return (
    <>
      <GridPatch />
      <Toolbar
        sx={{ justifyContent: "space-between", paddingY: 2 }}
        variant="dense"
      >
        <Typography variant="caption">{`P'JENG\`s Q&A \u2022 SUEA TALK 2026`}</Typography>
        {/* {session !== null && (
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
        )} */}
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
          {/* <Stack direction={"row"} sx={{ alignItems: "flex-start" }}>
            <RouterButton
              disableTouchRipple
              variant="contained"
              to="/"
              startIcon={<KeyboardBackspaceRoundedIcon />}
            >
              {`Back to my questions`}
            </RouterButton>
          </Stack> */}
        </Stack>
        <Box sx={{ paddingY: 6 }}>
          <Stack spacing={3}>
            {result.length === 0 ? (
              <Typography variant="caption" color="textSecondary">
                {`Nothing to see here.`}
              </Typography>
            ) : (
              result.map((sub) => (
                <Box key={sub.id}>
                  <QnaCard data={sub} />
                </Box>
              ))
            )}
            {/* {totalPageCount > 0 && (
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
            )} */}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
