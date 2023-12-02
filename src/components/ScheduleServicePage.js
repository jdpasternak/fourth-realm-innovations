import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useContext, useState } from "react";
import ApplicationContext from "../Context.js";
import { data } from "../static.js";
import dayjs from "dayjs";
import ReviewScheduleService from "./ReviewScheduleServiceModal.js";

const sampleAppointmentTimes = [
  new dayjs("2023112107:00"),
  new dayjs("2023112108:00"),
  new dayjs("2023112109:00"),
  new dayjs("2023112110:00"),
  new dayjs("2023112111:00"),
  new dayjs("2023112112:00"),
  new dayjs("2023112113:00"),
  new dayjs("2023112114:00"),
  new dayjs("2023112115:00"),
  new dayjs("2023112116:00"),
  new dayjs("2023112117:00"),
  new dayjs("2023112118:00"),
  new dayjs("2023112119:00"),
  new dayjs("2023112120:00"),
  new dayjs("2023112121:00"),
  new dayjs("2023112122:00"),
  new dayjs("2023112123:00"),
  new dayjs("2023112207:00"),
  new dayjs("2023112208:00"),
  new dayjs("2023112209:00"),
  new dayjs("2023112210:00"),
];

const CustomListSubheader = (props) => {
  return <ListSubheader {...props}>{props.children}</ListSubheader>;
};

const ServiceCategorySelect = (props) => {
  const servicesList = data.pages.find(
    (x) => x.name === "ScheduleService"
  ).services;
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel htmlFor="service-category">Service Categories</InputLabel>
      <Select
        id="service-category"
        label="Service Category"
        name="serviceCategories"
        onChange={({ target: { value } }) =>
          props.handleChange(value, "serviceCategories")
        }
        multiple
        value={props.serviceCategories || []}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {servicesList.map((service, i) => [
          <CustomListSubheader
            key={service.category}
            sx={{ fontSize: "1.5rem" }}
          >
            {service.category}
          </CustomListSubheader>,
          service.options.map((serviceOptions, j) => [
            <CustomListSubheader
              key={serviceOptions.subcategory}
              sx={{ fontSize: "1rem" }}
            >
              {serviceOptions.subcategory}
            </CustomListSubheader>,
            serviceOptions.items.map((item, k) => (
              <MenuItem
                key={item}
                value={item}
                divider={
                  j === service.options.length - 1 &&
                  k === serviceOptions.items.length - 1
                }
              >
                {item}
              </MenuItem>
            )),
          ]),
        ])}
      </Select>
      <FormHelperText htmlFor="service-category">
        Select from the wide variety of services we offer
      </FormHelperText>
    </FormControl>
  );
};

const ScheduleService = (props) => {
  const { sharedData, setSharedData } = useContext(ApplicationContext);
  const [displayModal, setDisplayModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (value, field) => {
    console.log(value, field);
    // For clearing the selected appointmentTime when browseDate is changed
    // if (field === "browseDate")
    //   setSharedData({
    //     ...sharedData,
    //     scheduleServiceDetails: {
    //       ...sharedData.scheduleServiceDetails,
    //       appointmentTime: null,
    //     },
    //   });

    if (field === "serviceCategories") {
      value = typeof value === "string" ? value.split(",") : value;
      setSharedData({
        ...sharedData,
        scheduleServiceDetails: {
          ...sharedData.scheduleServiceDetails,
          [field]: value,
        },
      });
      return;
    }
    setSharedData({
      ...sharedData,
      scheduleServiceDetails: {
        ...sharedData.scheduleServiceDetails,
        [field]: value,
      },
    });
  };

  const handleReview = () => {
    setDisplayModal(true);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    console.log({
      ...sharedData?.scheduleServiceDetails,
      appointmentTime:
        sharedData?.scheduleServiceDetails?.appointmentTime.format(),
    });
    setInterval(() => {
      setSubmitting(false);
    }, 3000);
  };

  const SectionTitle = (props) => {
    return (
      <Grid item xs={12}>
        <Typography variant={"h5"}>{props.childre}</Typography>
      </Grid>
    );
  };

  const FormField = (props) => {
    return (
      <Grid item xs={12} lg={4}>
        <TextField
          label={props?.label}
          type={props?.type}
          name={props?.name}
          // value={sharedData?.scheduleServiceDetails[props?.name] || ""}
          onChange={({ target: { value } }) => handleChange(value, props?.name)}
          fullWidth
          required
        />
      </Grid>
    );
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Schedule Service
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}></Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <form>
          <Grid container spacing={2}>
            <SectionTitle>Basic Information</SectionTitle>
            <FormField label="Name" name="name" type="text" />
            <Grid item xs={12} lg={4}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={sharedData?.scheduleServiceDetails?.email}
                onChange={({ target: { value } }) =>
                  handleChange(value, "email")
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="Phone Number"
                type="tel"
                name="phone"
                value={sharedData?.scheduleServiceDetails?.phone}
                onChange={({ target: { value } }) =>
                  handleChange(value, "phone")
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"h5"}>Service Address</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="Address Line 1"
                type="text"
                name="address1"
                value={sharedData?.scheduleServiceDetails?.address1}
                onChange={({ target: { value } }) =>
                  handleChange(value, "address1")
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="Address Line 2"
                type="text"
                name="address2"
                value={sharedData?.scheduleServiceDetails?.address2}
                onChange={({ target: { value } }) =>
                  handleChange(value, "address2")
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="City"
                type="text"
                name="city"
                value={sharedData?.scheduleServiceDetails?.city}
                onChange={({ target: { value } }) =>
                  handleChange(value, "city")
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="State"
                type="text"
                name="state"
                value={sharedData?.scheduleServiceDetails?.state}
                onChange={({ target: { value } }) =>
                  handleChange(value, "state")
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="Zip Code"
                type="text"
                name="zip"
                value={sharedData?.scheduleServiceDetails?.zip}
                onChange={({ target: { value } }) => handleChange(value, "zip")}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"h5"}>Service Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <ServiceCategorySelect
                serviceCategories={
                  sharedData?.scheduleServiceDetails?.serviceCategories
                }
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                type="text"
                name="notes"
                value={sharedData?.scheduleServiceDetails?.notes}
                onChange={({ target: { value } }) =>
                  handleChange(value, "notes")
                }
                fullWidth
                multiline
                rows={4}
                // helperText={"Include any other details we should be aware of"}
                helperText={"Tell us anything else we need to know"}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  label={"Service Date"}
                  value={
                    sharedData?.scheduleServiceDetails?.browseDate ||
                    new dayjs()
                  }
                  onChange={(value) => handleChange(value, "browseDate")}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid
              item
              xs={12}
              lg={6}
              lgOffset={3}
              display="flex"
              justifyContent={"center"}
            >
              <ButtonGroup
                display={"flex"}
                sx={{ flexWrap: "wrap", justifyContent: "center" }}
              >
                {sampleAppointmentTimes
                  .filter((x) =>
                    x.isSame(
                      dayjs(sharedData?.scheduleServiceDetails?.browseDate),
                      "day"
                    )
                  )
                  .map((appt) => (
                    <Button
                      key={appt}
                      variant={
                        sharedData?.scheduleServiceDetails?.appointmentTime ===
                        appt
                          ? "contained"
                          : "text"
                      }
                      onClick={() => handleChange(appt, "appointmentTime")}
                      sx={{ mb: 2, borderRadius: 0 }}
                    >
                      {appt.format("h:mm A")}
                    </Button>
                  ))}
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent={"flex-end"}>
              <Button variant={"outlined"} onClick={handleReview}>
                Review and Schedule
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <ReviewScheduleService
        open={displayModal}
        onClose={() => setDisplayModal(false)}
        handleSubmit={handleSubmit}
        serviceDetails={sharedData?.scheduleServiceDetails}
        submitting={submitting}
      />
    </Container>
  );
};

export default ScheduleService;
