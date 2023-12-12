import React, { useEffect, useState } from "react";
import ApplicationContext from "./Context";

const ApplicationContextProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState({});
  const [isContactPageAlertHidden, setContactPageAlertHidden] = useState(true);
  const [isContactPageLoading, setContactPageLoading] = useState(false);
  const [isMessageSent, setMessageSent] = useState(false);
  const [isContactFormHidden, setContactFormHidden] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [displayHelpModal, setDisplayHelpModal] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") != null);
    setLoggedInEmail(localStorage.getItem("loggedInEmail"));
    setToken(localStorage.getItem("token"));
  }, []);

  const contextValue = {
    displayHelpModal,
    setDisplayHelpModal,
    token,
    setToken,
    isLoggedIn,
    setLoggedIn,
    loggedInEmail,
    setLoggedInEmail,
    sharedData,
    setSharedData,
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
