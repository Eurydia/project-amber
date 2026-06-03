import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import { getServerAuthSession } from "#/integrations/auth/auth";
import { getAggregatedQuestions } from "#/server/db";

export const Route = createFileRoute("/all")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getServerAuthSession();
    return { session };
  },
  validateSearch: z.object({ page: z.number().int().nonnegative() }),
  loaderDeps: ({ search }) => {
    return { search };
  },
  loader: async ({ context, deps }) => {
    if (context.session === null) {
      throw redirect({ to: "/" });
    }

    const res = await getAggregatedQuestions({
      data: { page: deps.search.page },
    });
    return { submissions: res };
  },
});

function RouteComponent() {
  return <div>Hello "/all"!</div>;
}
