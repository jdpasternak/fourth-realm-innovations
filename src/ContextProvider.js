import React, { useState } from "react";
import ApplicationContext from "./Context";
import HomePage from "./components/HomePage.js";
import Blogs from "./components/Blogs.js";

const ApplicationContextProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState({});
  const [currentPage, setCurrentPage] = useState(<Blogs />);
  const [isContactPageAlertHidden, setContactPageAlertHidden] = useState(true);
  const [isContactPageLoading, setContactPageLoading] = useState(false);
  const [isMessageSent, setMessageSent] = useState(false);
  const [isContactFormHidden, setContactFormHidden] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const contextValue = {
    isLoggedIn,
    setLoggedIn,
    loggedInEmail,
    setLoggedInEmail,
    sharedData,
    setSharedData,
    currentPage,
    setCurrentPage,
    contactPageData: {
      isContactPageAlertHidden,
      setContactPageAlertHidden,
      isContactPageLoading,
      setContactPageLoading,
      isMessageSent,
      setMessageSent,
      isContactFormHidden,
      setContactFormHidden,
    },
  };

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
