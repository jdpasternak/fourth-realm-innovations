import { Button, ButtonGroup, Paper } from "@mui/material";
import { useContext } from "react";
import ApplicationContext from "../Context";
import HomePage from "./HomePage";
import Services from "./Services";
import Contact from "./Contact";
import ScheduleService from "./ScheduleService";

const Nav = () => {
  const { setCurrentPage } = useContext(ApplicationContext);

  return (
    <Paper component={"nav"} sx={{ p: 2 }}>
      <ButtonGroup variant="text" aria-label="button group">
        <Button onClick={() => setCurrentPage(() => <HomePage />)}>Home</Button>
        <Button onClick={() => setCurrentPage(() => <Services />)}>
          Services
        </Button>
        <Button onClick={() => setCurrentPage(() => <ScheduleService />)}>
          Schedule Service
        </Button>
        <Button onClick={() => setCurrentPage(() => <Contact />)}>
          Contact
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

export default Nav;
