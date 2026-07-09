import createEmotionCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import fontsourceVariableDmsansCss from "@fontsource-variable/dm-sans?url";
import fontsourceVariableFrauncesCss from "@fontsource-variable/fraunces?url";
import fontsourceVariableRobotoCss from "@fontsource-variable/roboto?url";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  redirect,
  Scripts,
} from "@tanstack/react-router";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { ThemedToastContainer } from "#/components/toast/themed-toast-container";
import { MAIN_THEME } from "#/theme/main";
import {
  EVENT_NAME,
  getCanonicalUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "#/utils/seo";

dayjs.extend(advancedFormat);

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: SITE_TITLE,
      },
      {
        name: "description",
        content: SITE_DESCRIPTION,
      },
      {
        name: "robots",
        content: "index,follow",
      },
      {
        name: "theme-color",
        content: "#FBF7E8",
      },
      {
        property: "og:site_name",
        content: SITE_NAME,
      },
      {
        property: "og:type",
        content: "website",
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
        name: "twitter:card",
        content: "summary",
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
          "@type": "WebSite",
          name: SITE_NAME,
          alternateName: EVENT_NAME,
          url: getCanonicalUrl("/all"),
          description: SITE_DESCRIPTION,
        },
      },
    ],
    links: [
      { rel: "stylesheet", href: fontsourceVariableRobotoCss },
      { rel: "stylesheet", href: fontsourceVariableDmsansCss },
      { rel: "stylesheet", href: fontsourceVariableFrauncesCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "canonical", href: getCanonicalUrl("/all") },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => {
    throw redirect({ to: "/" });
  },
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const emotionCache = createEmotionCache({ key: "css" });
  return (
    <html lang="th">
      <head>
        <HeadContent />
      </head>
      <body>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={MAIN_THEME}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {children}
            </LocalizationProvider>
            <ThemedToastContainer />
          </ThemeProvider>
        </CacheProvider>
        {/* <TanStackDevtools
          config={{
            position: "bottom-left",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        /> */}
        <Scripts />
      </body>
    </html>
  );
}
