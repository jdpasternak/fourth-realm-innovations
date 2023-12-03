import { useState } from "react";
import RequestServiceContext from "./RequestServiceContext";
import dayjs from "dayjs";

const RequestServiceContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    browseDate: dayjs().add(1, "day"),
  });
  const [validationErrors, setValidationErrors] = useState({});

  const context = {
    formData,
    setFormData,
    validationErrors,
    setValidationErrors,
  };

  return (
    <RequestServiceContext.Provider value={context}>
      {children}
    </RequestServiceContext.Provider>
  );
};

export default RequestServiceContextProvider;
