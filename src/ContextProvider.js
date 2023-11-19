import React, { useState } from "react";
import ApplicationContext from "./Context";

const ApplicationContextProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState({});

  const contextValue = {
    sharedData,
    setSharedData,
  };

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
