import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { APIError, betterAuth } from "better-auth";

export const authService = betterAuth({
  socialProviders: {
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
      prompt: "select_account",
      mapProfileToUser: (profile) => {
        console.debug(profile);

        if (
          profile.hd !== "ayw.ac.th" &&
          profile.email !== import.meta.env.VITE_APP_ADMIN_EMAIL
        ) {
          throw new APIError("FORBIDDEN", {
            message: `Sign in with your @ayw.ac.th Google account`,
          });
        }
        return {};
      },
    },
  },
});

export const getServerAuthSession = createServerFn({ method: "GET" }).handler(
  async () => {
    return authService.api.getSession({
      headers: getRequestHeaders(),
    });
  },
);
