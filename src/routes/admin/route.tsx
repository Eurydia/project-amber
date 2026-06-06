import { createFileRoute, redirect } from "@tanstack/react-router";
import { getServerAuthSession } from "#/integrations/auth/auth";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getServerAuthSession();
    if (
      session === null ||
      session.user.email !== import.meta.env.VITE_APP_ADMIN_EMAIL
    ) {
      throw redirect({ to: "/" });
    }

    return { session };
  },
  loader: () => {},
});

function RouteComponent() {
  return <div>Hello "/admin"!</div>;
}
