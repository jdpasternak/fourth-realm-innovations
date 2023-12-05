import { useState } from "react";
import LoginContext from "./LoginContext";

const LoginContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const context = {
    formData,
    setFormData,
    errors,
    setErrors,
    serverError,
    setServerError,
  };

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
};

export default LoginContextProvider;
