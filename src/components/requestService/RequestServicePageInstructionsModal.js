import {
  AccessTime,
  Check,
  Checklist,
  Close,
  Create,
  CreateOutlined,
  GradingOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const RequestServicePageInstructionsModal = (props) => {
  return (
    <Dialog {...props}>
      <DialogTitle>Request Service</DialogTitle>
      <IconButton
        onClick={props.onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <Typography>
          Welcome to our "Request Service" page! We're excited to assist you.
          Please follow the steps below to request a service at your preferred
          time.
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <CreateOutlined />
            </ListItemIcon>
            <ListItemText>
              <strong>Fill Out the Form</strong>: Provide us with your details
              in the form below. Be sure to include your full name, contact
              information, and address.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checklist />
            </ListItemIcon>
            <ListItemText>
              <strong>Select the Service</strong>: Choose the service, or
              services, you require from our list of available options. Each
              service is tailored to meet your specific needs.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoOutlined />
            </ListItemIcon>
            <ListItemText>
              <strong>Provide Additional Details</strong>: In the provided text
              box for <i>Notes</i>, describe any specific requirements or
              preferences you have for the service. The more details you
              provide, the better we can tailor our service to your needs.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText>
              <strong>Choose Your Preferred Time</strong>: Use our calendar tool
              to select a date and time that works best for you. We will do our
              best to accommodate your selection.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <GradingOutlined />
            </ListItemIcon>
            <ListItemText>
              <strong>Review and Submit</strong>: Before submitting, please
              review all the information to ensure accuracy. Once ready, click
              the 'Submit Request' button.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText>
              <strong>Confirmation</strong>: After submission, you'll receive a
              confirmation email with your request details and a reference
              number for any future correspondence.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText>
              <strong>Await Our Response</strong>: Our team will review your
              request and get in touch with you as soon as possible to confirm
              the appointment and discuss any further details.
            </ListItemText>
          </ListItem>
        </List>
        <Typography>
          <strong>Customer Support</strong>: If you have any questions or need
          assistance, please don't hesitate to contact our customer support
          team. We're here to help! Thank you for choosing us for your service
          needs. We look forward to serving you!
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
export default RequestServicePageInstructionsModal;
