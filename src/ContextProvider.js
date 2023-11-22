import React, { useState } from "react";
import ApplicationContext from "./Context";
import HomePage from "./components/HomePage.js";
import ScheduleService from "./components/ScheduleService.js";

const ApplicationContextProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState({});
  // const [currentPage, setCurrentPage] = useState(<HomePage />);
  const [currentPage, setCurrentPage] = useState(<ScheduleService />);
  const [isContactPageAlertHidden, setContactPageAlertHidden] = useState(true);
  const [isContactPageLoading, setContactPageLoading] = useState(false);
  const [isMessageSent, setMessageSent] = useState(false);
  const [isContactFormHidden, setContactFormHidden] = useState(false);

  const contextValue = {
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
