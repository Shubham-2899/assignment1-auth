import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { validateEmail } from "../helpers/UserDataValidation";

type Props = {};

export const ForgotPassword = (props: Props) => {
  const { resetPassword } = useUserAuth();
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const submitHanlder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailRef?.current?.value) {
      const validationMessage = validateEmail(emailRef?.current?.value);
      if (!validationMessage.length) {
        try {
          setError("");
          setMessage("");
          setLoading(true);
          await resetPassword(emailRef?.current?.value);
          setMessage("Check your inbox for further instructions");
        } catch (error: any) {
          setError(error);
        }
        setLoading(false);
      } else {
        setMessage("");
        setError(`${validationMessage} Please enter correct email `);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: "380px" }}>
      <Typography variant="h4" align="center" sx={{ padding: "25px 0" }}>
        Forgot Password
      </Typography>
      <Box component="form" onSubmit={submitHanlder} noValidate>
        {error && <Alert severity="error">{error.toString()}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <Typography variant="body1" sx={{ paddingTop: "10px" }}>
          Enter your email address and we'll send you a link to reset your
          password.
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          type="email"
          inputRef={emailRef}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ margin: "24px 0 16px 0 !important" }}
          disabled={loading}
        >
          Submit
        </Button>
        <Link to="/" className="links">
          {"Back to Sign in"}
        </Link>
      </Box>
    </Box>
  );
};
