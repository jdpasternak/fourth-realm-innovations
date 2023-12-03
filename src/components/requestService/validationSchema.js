import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  address1: yup.string().required("Address Line 1 is required"),
  address2: yup.string().nullable(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip Code is required"),
  notes: yup.string().nullable(),
  appointmentTime: yup.object().required("You must pick an appointment time"),
});

export default validationSchema;
