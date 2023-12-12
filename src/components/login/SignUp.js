import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import Copyright from "../Copyright";
import LoadingIcon from "../LoadingIcon";
import LoginContext from "./LoginContext";
import validationSchema from "./validationSchema";
import withLoginContext from "./withLoginContext";
import FormTextField from "./FormTextField";
import { Alert } from "@mui/material";
import ApplicationContext from "../../Context";

const SignUp = (props) => {
  const [isLoading, setLoading] = useState(false);
  const { formData, setFormData, setErrors, serverError, setServerError } =
    useContext(LoginContext);
  const { setToken, setLoggedIn, setLoggedInEmail } =
    useContext(ApplicationContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("event", event);
    console.log("formData", formData);
    setErrors([]);
    setServerError(null);
    setLoading(true);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      await submit();
    } catch (error) {
      console.error(error);
      let validationErrors = {};
      error.inner.forEach((err) => (validationErrors[err.path] = err.message));
      console.log("validationErrors", validationErrors);
      setErrors(validationErrors);
    }

    setLoading(false);
  };

  const submit = async () => {
    try {
      const response = await fetch(
        "https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/sign-up",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const { token } = await response.json();
        console.log(token);
        setToken(token);
        setLoggedIn(true);
        setLoggedInEmail(formData.email);
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", true);
        navigate("/");
      } else {
        const { message } = await response.json();
        console.log("Something went wrong...", message);
        setServerError(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {serverError && (
          <Alert sx={{ mt: 2, width: "100%" }} severity="error">
            {serverError}
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                label="First Name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                label="Last Name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                required
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    allowEmails: event.target.checked,
                  })
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <LoadingIcon /> : `Sign Up`}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default withLoginContext(SignUp);
