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
    <Dialog scroll="body" open={props.open} maxWidth="md" fullWidth>
      <DialogContent>
        <Typography>
          {`Login with an AYW Google account to participate in the Q&A.`}
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={signInGoogle}
        >
          {`Sign in with Google`}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
