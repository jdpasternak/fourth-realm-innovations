import { Container, Typography } from "@mui/material";
import withLoginContext from "./withLoginContext";

const ForgotPasswordPage = (props) => {
  return (
    <Container sx={{ mt: 2 }}>
      <Typography>Forgot Password</Typography>
    </Container>
  );
};

export default withLoginContext(ForgotPasswordPage);
