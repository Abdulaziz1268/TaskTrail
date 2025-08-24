import * as Yup from "yup"

export const loginValidationSchema = Yup.object({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(5).max(10).label("Password"),
})

export const registerValidationSchema = Yup.object({
  username: Yup.string().required().min(4).label("Username"),
  password: Yup.string().required().min(5).max(10).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
})

export const emailValidationSchema = Yup.object({
  email: Yup.string().email().required().label("Email"),
})

export const codeValidationSchema = Yup.object({
  code: Yup.string().length(6).required().label("Verification Code"),
})
