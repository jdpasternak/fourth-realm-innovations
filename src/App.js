import { Box, Container } from "@mui/material";
import "./App.css";
import ApplicationContextProvider from "./ContextProvider";
import Nav from "./components/Nav";
import "./i18n";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Services from "./components/Services";
import ScheduleService from "./components/ScheduleService";
import Contact from "./components/Contact";
import useScrollToTop from "./useScrollToTop";
import BlogPost from "./components/BlogPost";
import BlogList from "./components/BlogList";
import LoginForm from "./components/login/LoginForm";
import SignUpForm from "./components/login/SignUpForm";
import Account from "./components/Account";

function App() {
  return (
    <ApplicationContextProvider>
      <Router>
        <ScrollToTop />
        <Box>
          <Nav />
          <Container sx={{ my: 2 }}>
            <Routes>
              <Route exact path="/" Component={HomePage} />
              <Route exact path="/services" Component={Services} />
              <Route
                exact
                path="/schedule-service"
                Component={ScheduleService}
              />
              <Route exact path="/contact" Component={Contact} />
              <Route exact path="/blog" Component={BlogList} />
              <Route exact path="/blog/:slug" Component={BlogPost} />
              <Route exact path="/login" Component={LoginForm} />
              <Route exact path="/sign-up" Component={SignUpForm} />
              <Route exact path="/account" Component={Account} />
            </Routes>
          </Container>
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
