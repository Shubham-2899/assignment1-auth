import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Errors, IUserData } from "../Interfaces";
import { ChangeEvent, useState } from "react";
import {
  hasErrorsInUserData,
  userDataValidation,
} from "../helpers/UserDataValidation";
import { useUserAuth } from "../context/UserAuthContext";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import "../styles/signup-signin-styles.scss";

const Signup = () => {
  let userDefault: IUserData = {
    username: "",
    email: "",
    password: "",
    contact_number: "",
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUserData>(userDefault);
  const [formErrors, setFormErrors] = useState<Errors>({} as Errors);

  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validateData: Errors = userDataValidation(
      userData.email,
      userData.password,
      confirmPassword,
      userData.username,
      userData.contact_number
    );
    if (hasErrorsInUserData(validateData) === false) {
      try {
        setLoading(true);
        await signUp(userData.email, userData.password, userData.username);
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: userData.username,
          })
            .then(() => {
              // Profile updated!
            })
            .catch((error) => {
              alert(error);
            });
        }
        navigate("/");
      } catch (err) {
        setError("Email Already in Use");
        alert(err);
      }
    } else {
      setFormErrors(validateData);
    }
    setLoading(false);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginTop: "80px" }}>
        <Box className="signupBox">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {error.length ? <span>{error}</span> : null}
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                  onChange={onChangeHandler}
                />
              </Grid>
              {formErrors.nameError?.length === 0 ? null : (
                <span>{formErrors.nameError}</span>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact_number"
                  label="Contact Number"
                  name="contact_number"
                  onChange={onChangeHandler}
                />
              </Grid>
              {formErrors.contactError?.length === 0 ? null : (
                <span>{formErrors.contactError}</span>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={onChangeHandler}
                />
              </Grid>
              {formErrors.emailError?.length === 0 ? null : (
                <span>{formErrors.emailError}</span>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                />
              </Grid>
              {formErrors.passwordError?.length === 0 ? null : (
                <span>{formErrors.passwordError}</span>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Confirm password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              {formErrors.confirmPassError?.length === 0 ? null : (
                <span>{formErrors.confirmPassError}</span>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="formBtn"
              disabled={loading}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
