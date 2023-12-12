import { Container, Typography } from "@mui/material";
import { useContext } from "react";
import ApplicationContext from "../../Context";
import VerticalTabs from "./VerticalTabs";

const Account = (props) => {
  const { loggedInEmail } = useContext(ApplicationContext);
  return (
    <Container maxWidth="md">
      <Typography variant="h1">Account</Typography>
      <Typography>Logged-In User: {loggedInEmail}</Typography>
      <VerticalTabs />
    </Container>
  );
};

export default Account;
