import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ApplicationContext from "../Context";

const Nav = () => {
  const { isLoggedIn, setLoggedIn, setLoggedInEmail, loggedInEmail } =
    useContext(ApplicationContext);

  const handleLogout = () => {
    console.log(isLoggedIn);
    console.log("logging out...");
    setLoggedIn(false);
    setLoggedInEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInEmail");
  };

  return (
    <Paper
      component={"nav"}
      sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
    >
      <ButtonGroup variant="text" aria-label="button group">
        <Button component={Link} to={"/"}>
          Home
        </Button>
        <Button component={Link} to={"/services"}>
          Services
        </Button>
        {/* <Button component={Link} to={"/schedule-service"}>
          Schedule Service
        </Button> */}
        <Button component={Link} to={"/contact"}>
          Contact
        </Button>
        <Button component={Link} to={"/blog"}>
          Blog
        </Button>
      </ButtonGroup>
      <Box display="flex" alignItems={"center"}>
        {isLoggedIn && loggedInEmail && (
          <Typography sx={{ mr: 2, p: 0 }}>
            Welcome, {loggedInEmail?.split("@")[0]}!
          </Typography>
        )}
        <ButtonGroup>
          {isLoggedIn && (
            <Button variant="text" component={Link} to="/account">
              Account
            </Button>
          )}
          {isLoggedIn ? (
            <Button variant="text" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="text" component={Link} to="/login">
              Login
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

export default Nav;
