import * as yup from "yup";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  firstName: yup
    .string()
    .min(2, "First Name must be at least 2 characters")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(2, "Last Name must be at least 2 characters")
    .required("Last Name is required"),
});

export default validationSchema;
