import { Box, Button, ButtonGroup, Container, Paper } from "@mui/material";
import "./App.css";
import HomePage from "./components/HomePage";
import Services from "./components/Services";
import ScheduleService from "./components/ScheduleService";
import Contact from "./components/Contact";
import { useState } from "react";
import ApplicationContextProvider from "./ContextProvider";

function App() {
  const [currentPage, setCurrentPage] = useState("services");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "services":
        return <Services />;
      case "schedule-service":
        return <ScheduleService />;
      case "contact":
        return <Contact />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ApplicationContextProvider>
      <Box>
        <Paper component={"nav"} sx={{ p: 2 }}>
          <ButtonGroup variant="text" aria-label="button group">
            <Button onClick={() => setCurrentPage("home")}>Home</Button>
            <Button onClick={() => setCurrentPage("services")}>Services</Button>
            <Button onClick={() => setCurrentPage("schedule-service")}>
              Schedule Service
            </Button>
            <Button onClick={() => setCurrentPage("contact")}>Contact</Button>
          </ButtonGroup>
        </Paper>
        <Container>{renderCurrentPage()}</Container>
      </Box>
    </ApplicationContextProvider>
  );
}

export default App;
