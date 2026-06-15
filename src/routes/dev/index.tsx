import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import dayjs from "dayjs";
import z from "zod";
import { GridPatch } from "#/components/grid-patch";
import { QuestionList } from "#/components/question-list";
import { prisma } from "#/db";
import { getQuestions } from "#/server/db";

const getSessions = createServerFn().handler(async () => {
  return prisma.qnaSession.findMany({
    orderBy: { createdAt: "desc" },
  });
});

const submitSession = createServerFn({ method: "POST" })
  .validator(
    z.object({
      values: z.object({
        openAt: z.iso.datetime(),
        openUntil: z.iso.datetime(),
      }),
    }),
  )
  .handler(async ({ data }) => {
    return prisma.qnaSession.create({
      data: {
        openAt: data.values.openAt,
        openUntil: data.values.openUntil,
      },
    });
  });

export const Route = createFileRoute("/dev/")({
  component: RouteComponent,
  loader: async () => {
    const sessions = await getSessions();
    const questions = await getQuestions();
    return { sessions, questions };
  },
});

function RouteComponent() {
  const { sessions, questions } = Route.useLoaderData();
  const router = useRouter();
  const handleSubmitSession = useServerFn(submitSession);
  const sessionForm = useForm({
    defaultValues: {
      openAt: dayjs().toISOString(),
      openUntil: dayjs().toISOString(),
    },
    validators: {
      onDynamic: z.object({
        openAt: z.iso.datetime(),
        openUntil: z.iso.datetime(),
      }),
    },
    onSubmit: async ({ value }) => {
      return handleSubmitSession({ data: { values: value } }).then((resp) => {
        router.invalidate();
        return resp;
      });
    },
  });
  return (
    <>
      <GridPatch />
      <Container maxWidth="lg">
        <Box sx={{ paddingY: 8 }}>
          <Stack spacing={4}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Stack spacing={4} direction={"row"}>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      useFlexGap
                      sx={{ flexWrap: "wrap" }}
                    >
                      <sessionForm.Field name="openAt">
                        {(f) => (
                          <DatePicker
                            format="YYYY MMMM DD"
                            label="Open at"
                            value={dayjs(f.state.value)}
                            onChange={(next) => {
                              if (next === null) {
                                return;
                              }
                              f.handleChange(next.toISOString());
                            }}
                          />
                        )}
                      </sessionForm.Field>
                      <sessionForm.Field name="openAt">
                        {(f) => (
                          <TimeField
                            format="HH:mm:ss"
                            timezone="system"
                            value={dayjs(f.state.value)}
                            onChange={(next) => {
                              if (next === null) {
                                return;
                              }
                              f.handleChange(next.toISOString());
                            }}
                          />
                        )}
                      </sessionForm.Field>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      useFlexGap
                      sx={{ flexWrap: "wrap" }}
                    >
                      <sessionForm.Field name="openUntil">
                        {(f) => (
                          <DatePicker
                            format="YYYY MMMM DD"
                            label="Open until"
                            value={dayjs(f.state.value)}
                            onChange={(next) => {
                              if (next === null) {
                                return;
                              }
                              f.handleChange(next.toISOString());
                            }}
                          />
                        )}
                      </sessionForm.Field>
                      <sessionForm.Field name="openUntil">
                        {(f) => (
                          <TimeField
                            format="HH:mm:ss"
                            timezone="system"
                            value={dayjs(f.state.value)}
                            onChange={(next) => {
                              if (next === null) {
                                return;
                              }
                              f.handleChange(next.toISOString());
                            }}
                          />
                        )}
                      </sessionForm.Field>
                    </Stack>
                  </Stack>
                  <Toolbar disableGutters variant="dense">
                    <Button
                      onClick={() => sessionForm.handleSubmit()}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Toolbar>
                </Stack>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{`#`}</TableCell>
                        <TableCell>{`Open at`}</TableCell>
                        <TableCell>{`Open until`}</TableCell>
                        <TableCell>{`Created`}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sessions.map((session, i) => (
                        <TableRow
                          key={session.id}
                          sx={
                            i > 0
                              ? {
                                  textDecorationLine: "line-through",
                                  color: (t) => t.palette.text.disabled,
                                  textDecorationColor: (t) =>
                                    t.palette.error.main,
                                  textDecorationThickness: 4,
                                }
                              : undefined
                          }
                        >
                          <TableCell>{session.id}</TableCell>
                          <TableCell>
                            {dayjs(session.openAt).format(
                              "YYYY MMMM DD HH:mm:ss",
                            )}
                          </TableCell>
                          <TableCell>
                            {dayjs(session.openUntil).format(
                              "YYYY MMMM DD HH:mm:ss",
                            )}
                          </TableCell>
                          <TableCell>
                            {dayjs(session.createdAt).format(
                              "YYYY MMMM DD HH:mm:ss",
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <QuestionList submissions={questions} />
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
