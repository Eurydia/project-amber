import createEmotionCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import fontsourceVariableDmsansCss from "@fontsource-variable/dm-sans?url";
import fontsourceVariableFrauncesCss from "@fontsource-variable/fraunces?url";
import fontsourceVariableRobotoCss from "@fontsource-variable/roboto?url";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import dayjs from "dayjs";
import dayjsRelTime from "dayjs/plugin/relativeTime";
import { ToastContainer } from "react-toastify";
import { MAIN_THEME } from "#/theme/main";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

dayjs.extend(dayjsRelTime);

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
        title: "Korn's Q&A | SUEA TALK 2026",
      },
    ],
    links: [
      { rel: "stylesheet", href: fontsourceVariableRobotoCss },
      { rel: "stylesheet", href: fontsourceVariableDmsansCss },
      { rel: "stylesheet", href: fontsourceVariableFrauncesCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const emotionCache = createEmotionCache({ key: "css" });
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={MAIN_THEME}>
            <CssBaseline />
            {children}
            <ToastContainer
              closeOnClick
              style={{ fontFamily: `"Roboto variable"`, userSelect: "none" }}
            />
          </ThemeProvider>
        </CacheProvider>
        <TanStackDevtools
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
        />
        <Scripts />
      </body>
    </html>
  );
}
