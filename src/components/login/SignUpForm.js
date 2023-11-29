import { Alert, Button, Paper, Typography } from "@mui/material";
import * as yup from "yup";
import FormTextField from "./FormTextField";
import { useContext } from "react";
import LoginContext from "./LoginContext";
import withLoginContext from "./withLoginContext";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApplicationContext from "../../Context";
const Grid = Grid2;

const validationSchema = yup.object().shape({
  signUpFirstName: yup.string().required("First Name is required"),
  signUpLastName: yup.string().required("Last Name is required"),
  signUpEmail: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  signUpPassword: yup
    .string()
    .min(8, "Password too short")
    .required("Password is required"),
});

const SignUpForm = (props) => {
  const navigate = useNavigate();
  const { formData, setErrors, serverError, setServerError } =
    useContext(LoginContext);
  const { setLoggedInEmail, setLoggedIn } = useContext(ApplicationContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);

    try {
      await validationSchema.validate(formData, {
        abortEarly: false,
      });
      submitForm(formData);
    } catch (error) {
      console.log(error.inner);
      const validationErrors = [];
      error.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  const submitForm = async (formData) => {
    const {
      signUpEmail: email,
      signUpFirstName: firstName,
      signUpLastName: lastName,
      signUpPassword: password,
    } = formData;
    const response = await fetch(
      "https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/sign-up",
      {
        method: "POST",
        body: JSON.stringify({ email, firstName, lastName, password }),
      }
    );
    // console.log(response);
    if (response.ok) {
      const token = await response.json();
      localStorage.setItem("token", token);
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
            Sign-Up
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
                <FormTextField label="First Name" name="signUpFirstName" />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FormTextField label="Last Name" name="signUpLastName" />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FormTextField label="Email" name="signUpEmail" />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FormTextField label="Password" name="signUpPassword" />
              </Grid>
              <Grid item lg={6} xs={0}></Grid>
              <Grid
                item
                xs={12}
                lg={6}
                display="flex"
                justifyContent={"center"}
              >
                <Button variant={"contained"} onClick={handleSubmit}>
                  Sign-Up
                </Button>
              </Grid>
              <Grid item container xs={12}>
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Already have an account?</Typography>
                </Grid>
                <Grid item>
                  <Button component={Link} to={"/login"}>
                    Login
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

export default withLoginContext(SignUpForm);
