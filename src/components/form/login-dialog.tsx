import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { signInGoogle } from "#/integrations/auth/auth-client";
import { QRCodeCard } from "../qr-code-card";

export const LoginDialog: FC<{ open: boolean }> = (props) => {
  return (
    <Dialog
      scroll="body"
      open={props.open}
      maxWidth="md"
      fullWidth
      slotProps={{ backdrop: { sx: { backdropFilter: "blur(2px)" } } }}
    >
      <DialogTitle>
        <Typography
          sx={{
            color: (t) => t.palette.secondary.main,
          }}
        >
          {`Login with an AYW Google account to participate in the Q&A.`}
        </Typography>
      </DialogTitle>
      <DialogActions>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={signInGoogle}
        >
          {`Sign in with Google`}
        </Button>
      </DialogActions>
      <DialogContent>
        <QRCodeCard />
      </DialogContent>
    </Dialog>
  );
};
