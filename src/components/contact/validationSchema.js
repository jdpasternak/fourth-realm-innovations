import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  subject: yup.string(),
  body: yup.string().required("Body is required"),
});

export default validationSchema;
