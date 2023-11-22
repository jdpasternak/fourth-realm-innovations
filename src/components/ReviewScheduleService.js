import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";

const ReviewScheduleService = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Review Schedule Service Details</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 4 }}>
          <Typography>Name</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {props.serviceDetails?.name}
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography>Email</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {props.serviceDetails?.email}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography>Phone</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {props.serviceDetails?.phone}
          </Typography>
        </Box>
        <Box sx={{}}>
          <Typography>Service Address</Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          {/* do conditonal render to not render anything unless entire address is present and valid*/}
          <Typography sx={{ fontWeight: "bold" }}>
            {props.serviceDetails?.address1}
          </Typography>
          {props.serviceDetails?.address2 && (
            <Typography sx={{ fontWeight: "bold" }}>
              {props.serviceDetails?.address2}
            </Typography>
          )}
          <Typography sx={{ fontWeight: "bold" }}>
            {props.serviceDetails?.city}, {props.serviceDetails?.state}{" "}
            {props.serviceDetails?.zip}
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography>Service Categories</Typography>
          <List dense disablePadding>
            {props.serviceDetails?.serviceCategories &&
              props.serviceDetails?.serviceCategories.map((service) => (
                <ListItem sx={{ fontWeight: "bold", padding: 0 }}>
                  {service}
                </ListItem>
                //   <Typography sx={{ fontWeight: "bold" }}>{service}</Typography>
              ))}
          </List>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography>Service Date</Typography>
          {props.serviceDetails?.appointmentTime && (
            <Typography sx={{ fontWeight: "bold" }}>
              {props.serviceDetails?.appointmentTime.format(
                "dddd MMMM D, YYYY h:mm A"
              )}
            </Typography>
          )}
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography>Notes</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {props.serviceDetails?.notes}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={props.onClose}
          disabled={props.submitting}
        >
          Cancel
        </Button>
        <Button onClick={props.handleSubmit} disabled={props.submitting}>
          {props.submitting ? "Scheduling..." : "Schedule Service"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewScheduleService;
