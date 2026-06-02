import createEmotionCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import fontsourceVariableRobotoCss from "@fontsource-variable/roboto?url";
import fontsourceVariableStixTwoTextCss from "@fontsource-variable/stix-two-text?url";
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
        title: "TanStack Start Starter",
      },
    ],
    links: [
      { rel: "stylesheet", href: fontsourceVariableRobotoCss },
      { rel: "stylesheet", href: fontsourceVariableStixTwoTextCss },
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
            <ToastContainer closeOnClick />
          </ThemeProvider>
        </CacheProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
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
