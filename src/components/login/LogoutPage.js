import { Container, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import ApplicationContext from "../../Context";

const LogoutPage = (props) => {
  const { setLoggedIn, setLoggedInEmail } = useContext(ApplicationContext);

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedIn(false);
    setLoggedIn("");
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);
  return (
    <Container sx={{ mt: 2 }} maxWidth="md">
      <Typography>Logging out...</Typography>
    </Container>
  );
};

export default LogoutPage;
