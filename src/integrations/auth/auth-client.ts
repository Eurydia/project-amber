import { createClientOnlyFn } from "@tanstack/react-start";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const signInGoogle = createClientOnlyFn(() => {
  authClient.signIn.social({ provider: "google" });
});

export const signOutGoogle = createClientOnlyFn(
  (options: { onSuccess: () => Promise<void> }) => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: options.onSuccess,
      },
    });
  },
);
