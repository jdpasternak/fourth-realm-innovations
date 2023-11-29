import { Alert, Button, Paper, Typography } from "@mui/material";
import FormTextField from "./FormTextField";
import * as yup from "yup";
import { useContext, useState } from "react";
import LoginContext from "./LoginContext";
import withLoginContext from "./withLoginContext";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link, useNavigate } from "react-router-dom";
import ApplicationContext from "../../Context";
const Grid = Grid2;

const validationSchema = yup.object().shape({
  loginEmail: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  loginPassword: yup
    .string()
    .min(8, "Password too short")
    .required("Password is required"),
});

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState();
  const { formData, setErrors, setServerError, serverError } =
    useContext(LoginContext);
  const { setLoggedInEmail, setLoggedIn } = useContext(ApplicationContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      submitForm(formData);
    } catch (error) {
      const validationErrors = [];
      error.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      setLoading(false);
    }
  };

  const submitForm = async (formData) => {
    const { loginEmail: email, loginPassword: password } = formData;
    const response = await fetch(
      "https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    // console.log(response);
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("loggedInEmail", email);
      setLoggedIn(true);
      setLoggedInEmail(email);
      navigate("/");
    } else {
      //   console.error("Something went wrong");
      const { message } = await response.json();
      //   console.error(message);
      setServerError(message);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} lgOffset={3} lg={6}>
        <Paper sx={{ p: 2 }} elevation={8}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Login
          </Typography>
          {serverError && <Alert severity="error">{serverError}</Alert>}
          <form>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FormTextField
                  label="Email"
                  name="loginEmail"
                  required
                  type="email"
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FormTextField
                  label="Password"
                  name="loginPassword"
                  required
                  type="password"
                />
              </Grid>
              <Grid item lg={6} xs={0}></Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button onClick={handleSubmit} disabled={isLoading}>
                  Login
                </Button>
              </Grid>
              <Grid item container xs={12}>
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Don't have an account?</Typography>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to={"/sign-up"}
                    variant={"contained"}
                  >
                    Create Account
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withLoginContext(LoginForm);
