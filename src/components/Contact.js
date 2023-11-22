import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ApplicationContext from "../Context";

const Contact = (props) => {
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

  const handleSend = async (event) => {
    event.preventDefault();
    setContactPageLoading(true); // Start loading
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

  const validateMessageDetails = (messageDetails) => {
    if (
      messageDetails.name === null ||
      messageDetails.email === null ||
      messageDetails.body === null
    ) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Contact Us
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
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Subject"
                  type="text"
                  value={sharedData?.messageDetails?.subject}
                  onChange={(event) => handleChange(event, "subject")}
                  fullWidth
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
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
                {!isContactPageAlertHidden && (
                  <Alert severity="success">Message sent successfully!</Alert>
                )}
                &nbsp;
                <Button
                  type={"submit"}
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
    </>
  );
};

export default Contact;
