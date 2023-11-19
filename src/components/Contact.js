import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ApplicationContext from "../Context";

const Contact = (props) => {
  const { sharedData, setSharedData } = useContext(ApplicationContext);

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

  const handleChange = (val, field) => {
    console.log("val", val, "\nfield", field);
    switch (field) {
      case "name":
        setSharedData({
          ...sharedData,
          messageDetails: { ...sharedData.messageDetails, name: val },
        });
        break;
      case "email":
        setSharedData({
          ...sharedData,
          messageDetails: { ...sharedData.messageDetails, email: val },
        });
        break;
      case "subject":
        setSharedData({
          ...sharedData,
          messageDetails: { ...sharedData.messageDetails, subject: val },
        });
        break;
      case "body":
        setSharedData({
          ...sharedData,
          messageDetails: { ...sharedData.messageDetails, body: val },
        });
        break;
      default:
        break;
    }
  };

  const handleSend = async () => {
    await fetch(
      "https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/contact",
      {
        method: "POST",
        body: JSON.stringify(sharedData.messageDetails),
      }
    );
  };

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}></Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <TextField
              label="Name"
              type="text"
              value={sharedData?.messageDetails?.name}
              onChange={(event) => handleChange(event.target.value, "name")}
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Email"
              type="email"
              value={sharedData?.messageDetails?.email}
              onChange={(event) => handleChange(event.target.value, "email")}
              fullWidth
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              label="Subject"
              type="text"
              value={sharedData?.messageDetails?.subject}
              onChange={(event) => handleChange(event.target.value, "subject")}
              fullWidth
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              label="Body"
              type="text"
              value={sharedData?.messageDetails?.body}
              onChange={(event) => handleChange(event.target.value, "body")}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item lg={12} display={"flex"} justifyContent={"flex-end"}>
            <Button onClick={handleSend}>Send</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Contact;
