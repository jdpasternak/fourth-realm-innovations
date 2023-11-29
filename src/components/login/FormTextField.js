import { TextField } from "@mui/material";
import { useContext } from "react";
import LoginContext from "./LoginContext";

const FormTextField = (props) => {
  const { name, label } = props;
  const { formData, errors, setFormData } = useContext(LoginContext);

  const handleChange = (event) => {
    console.log("event", event);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <TextField
      label={label}
      name={name}
      onChange={handleChange}
      value={formData[name] || ""}
      error={errors[name] != null}
      helperText={errors[name]}
      required
    />
  );
};

export default FormTextField;
