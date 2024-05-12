import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username or Email is required"),
  password: yup
    .string()
    .min(8, "password must be at least 8 characters")
    .required("password is required"),
});

export const registerSchema = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "password must be at least 8 characters")
    .required("password is required"),
});
