import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Copyright from "../Copyright";
import LoadingIcon from "../LoadingIcon";
import LoginContext from "./LoginContext";
import withLoginContext from "./withLoginContext";
import FormTextField from "./FormTextField";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPasswordPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const { formData, setErrors, serverError, setServerError } =
    useContext(LoginContext);
  const [severity, setSeverity] = useState("error");
  const [displayRequestReceivedModal, setDisplayRequestReceivedModal] =
    useState();

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
        "https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/forgot-password",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const { message } = await response.json();
        console.log("message", message);
        setDisplayRequestReceivedModal(true);
      } else {
        setSeverity("error");
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
          Forgot password
        </Typography>
        {serverError && (
          <Alert sx={{ mt: 2, width: "100%" }} severity={severity}>
            {serverError}
          </Alert>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <Grid container spacing={2}>
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <LoadingIcon /> : `Reset Password`}
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
      <Dialog open={displayRequestReceivedModal}>
        <DialogTitle>Password Reset Request Received</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Thank you for submitting your request.
          </Typography>
          <Typography sx={{ mb: 2 }}>
            If there's an account associated with the email you submitted, we've
            sent an email with instructions to reset your password. Please check
            your inbox, as well as any spam or junk folders, to find our
            message.
          </Typography>
          <Typography sx={{ mb: 2 }}>
            If you don't receive an email within a few minutes, please try
            requesting again or contact our support team for assistance.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button component={Link} to="/">
            Return to Homepage
          </Button>
          <Button component={Link} to="/contact">
            Contact Support
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default withLoginContext(ForgotPasswordPage);
