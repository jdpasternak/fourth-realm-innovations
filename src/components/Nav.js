import { Button, ButtonGroup, Paper } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ApplicationContext from "../Context";

const Nav = () => {
  const { isLoggedIn, setLoggedIn, setLoggedInEmail } =
    useContext(ApplicationContext);

  const handleLogout = () => {
    console.log(isLoggedIn);
    console.log("logging out...");
    setLoggedIn(false);
    setLoggedInEmail("");
    localStorage.removeItem("token", "");
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
      <ButtonGroup>
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button component={Link} to="/login">
            Login
          </Button>
        )}
      </ButtonGroup>
    </Paper>
  );
};

export default Nav;
