import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import ReviewScheduleService from "./ReviewScheduleServiceModal.js";
import RequestServicePageInstructionsModal from "./RequestServicePageInstructionsModal.js";
import { HelpOutlineOutlined } from "@mui/icons-material";
import FormTextField from "./FormTextField.js";
import withRequestServiceContext from "./withRequestServiceContext.js";
import RequestServiceContext from "./RequestServiceContext.js";
import ServiceCategorySelect from "./ServiceCategorySelect.js";
import DatePicker from "./DatePicker.js";
import AppointmentsButtonGroup from "./AppointmentsButtonGroup.js";
import validationSchema from "./validationSchema.js";
import SectionTitle from "./SectionTitle.js";
import ThankYouModal from "./ThankYouModal.js";

const RequestServicePage = (props) => {
  const { formData, setValidationErrors } = useContext(RequestServiceContext);
  const [displayModal, setDisplayModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [displayHelpModal, setDisplayHelpModal] = useState(false);
  const [displayThankYouModal, setDisplayThankYouModal] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState("");

  const handleReview = async () => {
    try {
      await validationSchema.validate(formData, {
        abortEarly: false,
      });
      setValidationErrors([]);
      setDisplayModal(true);
    } catch (error) {
      let validationErrors = {};
      error.inner.forEach((x) => {
        validationErrors[x.path] = x.message;
      });
      setValidationErrors(validationErrors);
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    console.log({
      ...formData,
      appointmentTime: formData.appointmentTime.format(),
    });
    submit();
  };

  const submit = async () => {
    const body = JSON.stringify({
      ...formData,
      appointmentTime: formData.appointmentTime.format(),
    });
    console.log("body:", body);
    const response = await fetch(
      "https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/request-service",
      {
        method: "POST",
        body: body,
      }
    );

    if (response.ok) {
      console.log("Success");
      // Show a message or somehow alert the customer of the successful transaction
      const data = await response.json();
      console.log("response data:", data);
      setServiceRequestId(data.serviceRequestId);
      setDisplayThankYouModal(true);
      setDisplayModal(false);
    } else {
      console.log(
        "Something went wrong:",
        response.status,
        await response.json()
      );
    }

    setSubmitting(false);
  };

  return (
    <Container maxWidth={"md"}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Request Service{" "}
          <IconButton onClick={() => setDisplayHelpModal(true)}>
            <HelpOutlineOutlined />
          </IconButton>
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}></Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <form>
          <Grid container spacing={2}>
            <SectionTitle>Basic Information</SectionTitle>
            <Grid item xs={12} lg={12}>
              <FormTextField label="Name" name="name" type="text" required />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormTextField label="Email" name="email" type="email" required />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormTextField
                label="Phone Number"
                name="phone"
                type="tel"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"h5"}>Service Address</Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormTextField
                label="Address Line 1"
                name="address1"
                type="text"
                required
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormTextField
                label="Address Line 2"
                name="address2"
                type="text"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormTextField label="City" name="city" type="text" required />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormTextField label="State" name="state" type="text" required />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormTextField label="Zip Code" name="zip" type="text" required />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"h5"}>Service Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <ServiceCategorySelect
                serviceCategories={formData?.serviceCategories}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                label="Notes"
                name="notes"
                type="text"
                fullWidth
                multiline
                rows={4}
                // helperText={"Include any other details we should be aware of"}
                helperText={"Tell us anything else we need to know"}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={12} lg={6} justifyContent={"center"}>
              <AppointmentsButtonGroup />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent={"flex-end"}>
              <Button variant={"outlined"} onClick={handleReview}>
                Review and Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <ReviewScheduleService
        open={displayModal}
        onClose={() => setDisplayModal(false)}
        handleSubmit={handleSubmit}
        serviceDetails={formData}
        submitting={submitting}
      />
      <RequestServicePageInstructionsModal
        open={displayHelpModal}
        onClose={() => setDisplayHelpModal(false)}
      />
      <ThankYouModal
        serviceRequestId={serviceRequestId}
        displayThankYouModal={displayThankYouModal}
        setDisplayThankYouModal={setDisplayThankYouModal}
      />
    </Container>
  );
};

export default withRequestServiceContext(RequestServicePage);
