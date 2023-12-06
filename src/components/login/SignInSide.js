import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Copyright from "../Copyright";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import withLoginContext from "./withLoginContext";
import LoginContext from "./LoginContext";
import FormTextField from "./FormTextField";
import { Link as RRLink } from "react-router-dom";
import { LOGIN_URL } from "../../constants";
import ApplicationContext from "../../Context";
import { Alert } from "@mui/material";
import LoadingIcon from "../LoadingIcon";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email Address is invalid")
    .required("Email Address is required"),
  password: yup.string().required("Password is required"),
});

const SignInSide = () => {
  const { setLoggedIn, setLoggedInEmail } = useContext(ApplicationContext);
  const { formData, setErrors, setServerError, serverError } =
    useContext(LoginContext);
  const [backgroundImage, setBackgroundImage] = useState(
    `url(/img/SignInBackground${Math.floor(Math.random() * 3 + 1)}.png)`
  );
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors([]);
    setServerError("");

    console.log("formData", formData);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      await submit();
    } catch (error) {
      console.error(error);
      let validationErrors = {};
      error.inner.forEach((x) => {
        validationErrors[x.path] = x.message;
      });
      setErrors(validationErrors);
      setLoading(false);
    }
  };

  const submit = async () => {
    console.log("Submitting...");

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInEmail", formData.email);
        setLoggedIn(true);
        setLoggedInEmail(formData.email);
        navigate("/");
      } else {
        //   console.error("Something went wrong");
        const { message } = await response.json();
        //   console.error(message);
        setServerError(message);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: backgroundImage,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {serverError && <Alert severity="error">{serverError}</Alert>}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <FormTextField
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              margin="normal"
              required
              fullWidth
            />
            <FormTextField
              label="Password"
              name="password"
              type="password"
              autoComplete="password"
              autoFocus
              margin="normal"
              required
              fullWidth
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              name="remember"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? <LoadingIcon /> : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RRLink} to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
    // </ThemeProvider>
  );
};

export default withLoginContext(SignInSide);
