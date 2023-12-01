import { Box, IconButton } from "@mui/material";
import "./App.css";
import ApplicationContextProvider from "./ContextProvider";
import Nav from "./components/Nav";
import "./i18n";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import Services from "./components/Services";
import ScheduleService from "./components/ScheduleService";
import Contact from "./components/Contact";
import useScrollToTop from "./useScrollToTop";
import BlogPost from "./components/BlogPost";
import BlogList from "./components/BlogList";
import Account from "./components/Account";
import { HelpOutlineOutlined } from "@mui/icons-material";
import HelpPage from "./components/HelpPage";
import SignInSide from "./components/login/SignInSide";
import SignUp from "./components/login/SignUp";

function App() {
  return (
    <ApplicationContextProvider>
      <Router>
        <ScrollToTop />
        <Box>
          <Nav />
          {/* <Container sx={{ my: 2 }}> */}
          <Routes>
            <Route exact path="/" Component={HomePage} />
            <Route exact path="/services" Component={Services} />
            <Route exact path="/schedule-service" Component={ScheduleService} />
            <Route exact path="/contact" Component={Contact} />
            <Route exact path="/blog" Component={BlogList} />
            <Route exact path="/blog/:slug" Component={BlogPost} />
            <Route exact path="/login" Component={SignInSide} />
            <Route exact path="/sign-up" Component={SignUp} />
            <Route exact path="/account" Component={Account} />
            <Route exact path="/help" Component={HelpPage} />
          </Routes>
          {/* </Container> */}
          <IconButton
            LinkComponent={Link}
            to="/help"
            sx={{ position: "fixed", bottom: 0, right: 0, mr: 1, mb: 1 }}
          >
            <HelpOutlineOutlined />
          </IconButton>
        </Box>
      </Router>
    </ApplicationContextProvider>
  );
}

const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

export default App;
