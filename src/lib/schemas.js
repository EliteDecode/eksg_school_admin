export const LoginSchema = yup.object({
  school_code: yup.string().required("school code is required"),
  pin: yup.string().required("Pin is required"),
  exam_type: yup.string().required("Exam type is required"),
});

import * as yup from "yup";

const school = JSON.parse(localStorage.getItem("SchoolAdminUser"));

export const registerStudentSchema = yup.object({
  firstname: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "Firstname must be at most 50 characters")
    .required("Firstname is required"),
  surname: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "Surname must be at most 50 characters")
    .required("Surname is required"),
  passportLocal: yup.string().required("Passport is required"),
  othername: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "Other names must be at most 50 characters"),
  date_of_birth: yup.string().required("Date of birth is required"),
  lga: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "LGA must be at most 50 characters")
    .required("LGA is required"),
  placed_school_lga: yup.string().required("Placement school LGA is required"),
  placed_school_id: yup.number().required("Placement school is required"),
  gender: yup.string().trim().required("Gender is required"),
  state_of_origin: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "State of origin must be at most 50 characters")
    .required("State of origin is required"),
  ca_scores: yup
    .array()
    .min(
      school?.user?.exam_type_id == 1 ? 5 : 9,
      `Please select at least ${
        school?.user?.exam_type_id == 1 ? "5" : "9"
      } subjects with min value of 0 and max value of 30.`
    )
    .required("Test scores are required"),
});

export const addAdminSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "Admin Name must be at most 50 characters")
    .required("Admin Name is required"),
  email: yup
    .string()
    .email("Invalid email address entered")
    .trim()
    .required("Admins Email is required"),
  password: yup
    .string()
    .trim()
    .strict(true)
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .required("Password is required")
    .max(15, "Password must be at most 15 characters"),
  password_confirmation: yup
    .string()
    .trim()
    .strict(true)
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required")
    .max(15, "Confirm password must be at most 15 characters"),
  status: yup.string().trim().required("Admin status is required"),
});

export const editAdminSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "Admin Name must be at most 50 characters"),
  email: yup
    .string()
    .email("Invalid email address entered")
    .trim()
    .required("Admins Email is required"),
  password: yup
    .string()
    .trim()
    .strict(true)
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .max(15, "Password must be at most 15 characters"),
  password_confirmation: yup
    .string()
    .trim()
    .strict(true)
    .when("password", {
      is: (val) => val && val.length > 0,
      then: (schema) =>
        schema
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]/,
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
          )
          .max(15, "Password must be at most 15 characters")
          .required("Confirm password is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  status: yup.string().trim(),
});

export const updateEditStudentSchema = yup.object({
  ca_scores: yup
    .array()
    .min(
      9,
      `Please select at least 9 subjects with min value of 0 and max value of 30.`
    )
    .required("Test scores are required"),
  passportLocal: yup.string().required("Passport is required"),
});
