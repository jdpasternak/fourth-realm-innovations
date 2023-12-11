import { Close, ContentCopy } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

const ThankYouModal = (props) => {
  const { displayThankYouModal, setDisplayThankYouModal, serviceRequestId } =
    props;
  const navigate = useNavigate();

  const handleClose = () => {
    setDisplayThankYouModal(false);
    navigate("/");
  };
  const handleCopy = () => {
    if (navigator.clipboard)
      navigator.clipboard
        .writeText(serviceRequestId)
        .then(() => console.log("Service Request ID copied to clipboard"))
        .catch((err) =>
          console.error("Failed to copy Service Request ID:", err)
        );
  };
  return (
    <Dialog open={displayThankYouModal} onClose={handleClose}>
      <DialogTitle>
        Thank You!
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          Service Request ID: {serviceRequestId}
          <Tooltip title="Copy Service Request ID">
            <IconButton onClick={handleCopy}>
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </Typography>
        <Typography sx={{ textAlign: "justify" }}>
          Your appointment request has been sent to our team. You'll be
          receiving a call within 24 hours to confirm your appointment details.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouModal;
