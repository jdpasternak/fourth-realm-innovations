import { Box } from "@mui/material";
import "./App.css";
import ApplicationContextProvider from "./ContextProvider";
import "./i18n";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import ContactPage from "./components/contact/ContactPage";
import useScrollToTop from "./useScrollToTop";
import BlogPost from "./components/blog/BlogPost";
import BlogList from "./components/blog/BlogList";
import Account from "./components/Account";
import HelpPage from "./components/HelpPage";
import SignInSide from "./components/login/SignInSide";
import SignUp from "./components/login/SignUp";
import RequestServicePage from "./components/requestService/RequestServicePage";
import ServicesPage from "./components/services/ServicesPage";
import ScheduleServicePage from "./components/requestService/ScheduleServicePage";
import ForgotPasswordPage from "./components/login/ForgotPasswordPage";
import CustomAppBar from "./components/CustomAppBar";
import LogoutPage from "./components/login/LogoutPage";
import HelpModal from "./components/HelpModal";
import HelpButton from "./components/HelpButton";

function App() {
  return (
    <ApplicationContextProvider>
      <Router>
        <ScrollToTop />
        <Box>
          <CustomAppBar />
          <Routes>
            <Route exact path="/" Component={HomePage} />
            <Route exact path="/services" Component={ServicesPage} />
            <Route
              exact
              path="/schedule-service"
              Component={ScheduleServicePage}
            />
            <Route
              exact
              path="/request-service"
              Component={RequestServicePage}
            />
            <Route exact path="/contact" Component={ContactPage} />
            <Route exact path="/blog" Component={BlogList} />
            <Route exact path="/blog/:slug" Component={BlogPost} />
            <Route exact path="/login" Component={SignInSide} />
            <Route exact path="/sign-up" Component={SignUp} />
            <Route
              exact
              path="/forgot-password"
              Component={ForgotPasswordPage}
            />
            <Route exact path="/account" Component={Account} />
            <Route exact path="/help" Component={HelpPage} />
            <Route exact path="/logout" Component={LogoutPage} />
          </Routes>
          <HelpButton />
        </Box>
      </Router>
      <HelpModal />
    </ApplicationContextProvider>
  );
}

const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

export default App;
