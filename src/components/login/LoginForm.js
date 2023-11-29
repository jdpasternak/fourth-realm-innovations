import { Button, Paper, Typography } from "@mui/material";
import FormTextField from "./FormTextField";
import * as yup from "yup";
import { useContext, useEffect } from "react";
import LoginContext from "./LoginContext";
import withLoginContext from "./withLoginContext";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";
const Grid = Grid2;

const validationSchema = yup.object().shape({
  loginUsername: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  loginPassword: yup
    .string()
    .min(8, "Password too short")
    .required("Password is required"),
});

const LoginForm = (props) => {
  const { formData, setFormData, errors, setErrors } = useContext(LoginContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      submitForm(formData);
    } catch (error) {
      const validationErrors = [];
      error.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  const submitForm = (formData) => {};

  return (
    <Grid container>
      <Grid item xs={12} lgOffset={3} lg={6}>
        <Paper sx={{ p: 2 }} elevation={8}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Login
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FormTextField label="Username" name="loginUsername" />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FormTextField label="Password" name="loginPassword" />
              </Grid>
              <Grid item lg={6} xs={0}></Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button onClick={handleSubmit}>Login</Button>
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
