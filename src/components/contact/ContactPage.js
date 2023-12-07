import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ApplicationContext from "../../Context";
import validationSchema from "./validationSchema";
import { Email, Facebook, LinkedIn, Phone, Twitter } from "@mui/icons-material";

/*
  [x] Implement yup
*/

const ContactPage = (props) => {
  const {
    sharedData,
    setSharedData,
    contactPageData: {
      isContactPageAlertHidden,
      setContactPageAlertHidden,
      isContactPageLoading,
      setContactPageLoading,
      isMessageSent,
      setMessageSent,
      isContactFormHidden,
      setContactFormHidden,
    },
  } = useContext(ApplicationContext);

  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    !sharedData.messageDetails &&
      setSharedData({
        ...sharedData,
        messageDetails: {
          name: "",
          email: "",
          subject: "",
          body: "",
        },
      });
  }, []);

  const handleChange = (event, field) => {
    setSharedData({
      ...sharedData,
      messageDetails: {
        ...sharedData.messageDetails,
        [field]: event.target.value,
      },
    });
  };

  const validateData = async () => {
    setValidationErrors([]);

    try {
      await validationSchema.validate(sharedData.messageDetails, {
        abortEarly: false,
      });
      return true;
    } catch (error) {
      let errors = {};
      error.inner.forEach((x) => {
        errors[x.path] = x.message;
      });
      console.log("errors", errors);
      setValidationErrors(errors);
      setContactPageLoading(false);
      return false;
    }
  };

  const handleSend = async (event) => {
    // event.preventDefault();
    setContactPageLoading(true); // Start loading

    const isValid = await validateData();
    if (!isValid) return;

    try {
      const response = await fetch(
        "https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/contact",
        {
          method: "POST",
          body: JSON.stringify(sharedData.messageDetails),
        }
      );
      console.log(response);
      if (response.ok) {
        setContactPageAlertHidden(false);
        setMessageSent(true);
        setInterval(() => setContactFormHidden(true), 7000);
        localStorage.setItem("hasMessageBeenSent", true);
        localStorage.setItem("messageSentDate", Date.now());
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
    setContactPageLoading(false); // End loading
    setInterval(() => {
      setContactPageAlertHidden(true);
    }, 5000);
  };

  return (
    <Container maxWidth={"md"}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}></Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <Card sx={{ display: "flex", justifyContent: "center" }}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                my: 1,
                width: "100%",
              }}
            >
              <Email sx={{ mr: 2 }} />
              <Typography
                component="a"
                href="mailto:jake@fourthrealminnovations.com"
                sx={{ textDecoration: "none" }}
              >
                jake@fourthrealminnovations.com
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
              <Phone sx={{ mr: 2 }} />
              <Typography
                component="a"
                href="tel:+18082163534"
                sx={{ textDecoration: "none" }}
              >
                (808) 216-3534
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Box
                component={"img"}
                src="/img/rumble-full-logo-v4.svg"
                sx={{ mr: 2, ml: -0.75 }}
              />
              <Typography
                component="a"
                href="https://rumble.com/c/JakesDevLab"
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                Jake's DevLab
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
                alignSelf: "center",
              }}
            >
              <Button
                sx={{ minWidth: 0 }}
                component="a"
                href="https://www.facebook.com/profile.php?id=61554395008362"
                target="_blank"
              >
                <Facebook />
              </Button>
              <Button
                sx={{ minWidth: 0 }}
                component="a"
                href="https://twitter.com/FourthRealmTech"
                target="_blank"
              >
                <Twitter />
              </Button>
              <Button
                sx={{ minWidth: 0 }}
                component="a"
                href="https://www.linkedin.com/company/fourth-realm-innovations/about"
                target="_blank"
              >
                <LinkedIn />
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Send Us a Message
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}></Typography>
      </Box>
      <Box sx={{ my: 4 }}></Box>
      {!isContactFormHidden ? (
        <form onSubmit={handleSend}>
          <Box sx={{ my: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="Name"
                  type="text"
                  value={sharedData?.messageDetails?.name}
                  onChange={(event) => handleChange(event, "name")}
                  fullWidth
                  required
                  error={validationErrors?.name != null}
                  helperText={validationErrors?.name}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="Email"
                  type="email"
                  value={sharedData?.messageDetails?.email}
                  onChange={(event) => handleChange(event, "email")}
                  fullWidth
                  required
                  error={validationErrors?.email != null}
                  helperText={validationErrors.email}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Subject"
                  type="text"
                  value={sharedData?.messageDetails?.subject}
                  onChange={(event) => handleChange(event, "subject")}
                  fullWidth
                  error={validationErrors?.subject != null}
                  helperText={validationErrors.subject}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Body"
                  type="text"
                  value={sharedData?.messageDetails?.body}
                  onChange={(event) => handleChange(event, "body")}
                  multiline
                  rows={4}
                  fullWidth
                  required
                  error={validationErrors?.body != null}
                  helperText={validationErrors.body}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
                {!isContactPageAlertHidden && (
                  <Alert severity="success">Message sent successfully!</Alert>
                )}
                &nbsp;
                <Button
                  // type={"submit"}
                  onClick={handleSend}
                  disabled={isContactPageLoading || isMessageSent}
                >
                  {isContactPageLoading
                    ? "Sending..."
                    : isMessageSent
                    ? "Sent!"
                    : "Send"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      ) : (
        <Typography variant="h5">
          Thank you for sending us a message!
        </Typography>
      )}
    </Container>
  );
};

export default ContactPage;
