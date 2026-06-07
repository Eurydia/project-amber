import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { betterAuth } from "better-auth";

export const authService = betterAuth({
  socialProviders: {
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
      prompt: "select_account",
      hd: import.meta.env.DEV ? undefined : "ayw.ac.th",
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
