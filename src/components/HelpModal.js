import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import ApplicationContext from "../Context";

const HelpModal = (props) => {
  const { displayHelpModal, setDisplayHelpModal } =
    useContext(ApplicationContext);

  const handleClose = () => {
    setDisplayHelpModal(false);
  };

  return (
    <Dialog open={displayHelpModal} onClose={handleClose}>
      <DialogTitle>How can we help? (FAQs)</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            I requested service and haven't heard anything for more than 24
            hours.
          </Typography>
          <Typography>
            Not to worry! We do our best to keep track of all service requests,
            but sometimes we lose track. Call now to confirm your appointment
            details and we'll get your issue resolved.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            I have questions about my invoice or need help paying.
          </Typography>
          <Typography>
            Send your questions to{" "}
            <Link href="mailto:jake@fourthrealminnovations.com">
              jake@fourthrealminnovations.com
            </Link>{" "}
            or <Link href="tel:+18082163534">call 808-216-3534 now</Link>.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
