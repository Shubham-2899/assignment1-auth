import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import Loading from "../Loading";
import "./signup-signin-styles.scss";
import { useUserAuth } from "../../context/UserAuthContext";

const Signin = () => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { logIn, setLogin } = useUserAuth();

  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await logIn(email, password);
      sessionStorage.setItem("UserEmail", email);
      setLogin(true);
      navigate("/home");
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    let authToken = sessionStorage.getItem("UserEmail");
    // console.log(authToken);
    if (authToken) {
      navigate("/home");
    }
    if (!authToken) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        // <Container >
        <Box className="signin">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <span>{error.message}</span>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="formBtn"
              disabled={loading}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link to="/">Forgot password?</Link>
              </Grid> */}
              <Grid item>
                Don't have an account? <Link to="/signup">{"Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        // </Container>
      )}
    </>
  );
};

export default Signin;
