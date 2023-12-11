import { useContext } from "react";
import ApplicationContext from "../Context";
import { IconButton } from "@mui/material";
import { HelpOutlineOutlined } from "@mui/icons-material";

const HelpButton = (props) => {
  const { setDisplayHelpModal } = useContext(ApplicationContext);

  const handleClick = () => {
    setDisplayHelpModal(true);
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{ position: "fixed", bottom: 0, right: 0, mr: 1, mb: 1 }}
    >
      <HelpOutlineOutlined />
    </IconButton>
  );
};
export default HelpButton;
