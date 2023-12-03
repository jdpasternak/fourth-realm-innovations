import { useContext } from "react";
import RequestServiceContext from "./RequestServiceContext";
import { TextField } from "@mui/material";

const FormTextField = (props) => {
  const {
    formData,
    setFormData,
    validationErrors: errors,
  } = useContext(RequestServiceContext);
  const { name, label, type } = props;

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;

    setFormData({
      ...formData,
      [name]:
        name === "serviceCategories"
          ? typeof value === "string"
            ? value.split(",")
            : value
          : value,
    });
  };

  return (
    <TextField
      label={label}
      type={type}
      name={name}
      value={formData?.[name]}
      onChange={({ target: { value } }) => handleChange(value, name)}
      error={errors?.[name] != null}
      helperText={errors?.[name]}
      fullWidth
      {...props}
    />
  );
};

export default FormTextField;
