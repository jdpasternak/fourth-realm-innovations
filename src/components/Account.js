import { Box, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import ApplicationContext from "../Context";

const Account = (props) => {
  const { loggedInEmail } = useContext(ApplicationContext);
  return (
    <Box>
      <Typography variant="h1">Account</Typography>
      <Typography>Logged-In User: {loggedInEmail}</Typography>
      <TextField label="First Name" name="firstName" />
      <TextField label="Last Name" name="lastName" />
    </Box>
  );
};

export default Account;
