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

/* TODO

  [] Refactor components to seperate files
  [] Scheduling function
    [] Dumb-scheduler to has hour blocks from 9-5 daily for the next 30 days; calendar does not display for other dates
  [] Implement form validation
  [] Check that form is valid before opening review modal
  [] Configure backend flow
    [] Lambda function receives form details
    [] Creates a records in a DDB table
      [] Generates random ID for appointment request
    [] Sends email to jdp.pasternak@gmail.com with details
    [] Sends email to user requesting appointment, includes request ID

*/

const RequestServicePage = (props) => {
  const { formData, setFormData, setValidationErrors } = useContext(
    RequestServiceContext
  );
  const [displayModal, setDisplayModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [displayHelpModal, setDisplayHelpModal] = useState(false);

  const handleReview = async () => {
    // TODO Check if data is valid first, then show modal
    try {
      await validationSchema.validate(formData, {
        abortEarly: false,
      });
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
    setInterval(() => {
      setSubmitting(false);
    }, 3000);
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
              <FormTextField label="Name" name="name" type="text" />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormTextField label="Email" name="email" type="email" />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormTextField label="Phone Number" name="phone" type="tel" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"h5"}>Service Address</Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormTextField
                label="Address Line 1"
                name="address1"
                type="text"
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
              <FormTextField label="City" name="city" type="text" />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormTextField label="State" name="state" type="text" />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormTextField label="Zip Code" name="zip" type="text" />
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
    </Container>
  );
};

export default withRequestServiceContext(RequestServicePage);
