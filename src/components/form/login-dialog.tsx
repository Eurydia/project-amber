import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { signInGoogle } from "#/integrations/auth/auth-client";
import { QRCodeCard } from "../qr-code-card";

export const LoginDialog: FC<{ open: boolean }> = (props) => {
  return (
    <Dialog scroll="body" open={props.open} maxWidth="md" fullWidth>
      <DialogContent>
        <Grid container spacing={{ xs: 3, md: 0 }}>
          <Grid size={{ md: 7.5, sm: 12 }}>
            <Stack spacing={3}>
              <Stack>
                <Typography color="textSecondary" variant="caption">
                  {`AYW access required`}
                </Typography>
                <Typography variant="h2" component={"span"}>
                  {`Sign in before you start.`}
                </Typography>
              </Stack>
              <Typography color="textSecondary">
                {`Use your AYW Google account to participate in the Q&A. This window stays in place until sign-in is complete. `}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            size={{ md: "grow", xs: 12 }}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{ minWidth: "fit-content" }}
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={signInGoogle}
            >
              {`Sign in with Google`}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider flexItem />
      <DialogContent
        sx={{ backgroundColor: (t) => t.palette.background.default }}
      >
        <QRCodeCard value={window.location.href} />
      </DialogContent>
    </Dialog>
  );
};
