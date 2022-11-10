import { Errors } from "../Interfaces";

export function userDataValidation(
  email: string,
  password: string,
  confirmPassword: string,
  username: string,
  contact_number: string
): Errors {
  let errors: Errors = {
    emailError: "",
    passwordError: "",
    confirmPassError: "",
    nameError: "",
    contactError: "",
  };

  errors.nameError = validateUsername(username);
  errors.contactError = validateContactNumber(contact_number);
  errors.emailError = validateEmail(email);
  errors.passwordError = validatePassword(password);
  if (password !== confirmPassword) {
    errors.confirmPassError = "Password does not match";
  }

  return errors;
}

export const validatePassword = (password: string) => {
  if (password.length < 6) {
    return "Password length must be greater than 6";
  } else if (password.length > 10) {
    return "Password length can not be greater than 10";
  }
  return "";
};

export const validateUsername = (username: string) => {
  if (username.length <= 0) {
    return "Username can not be empty";
  } else if (/\d/i.test(username)) {
    return "Username contains alphabets only";
  }
  return "";
};

export const validateEmail = (email: string) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  if (!regex.test(email)) {
    return "This is not a valid email format!";
  }
  return "";
};

export const validateContactNumber = (contact_number: string) => {
  const mobileno = /^((\\+91-?)|0)?[0-9]{10}$/;
  if (!contact_number.match(mobileno)) {
    return "Invalid Contact Number";
  }
  return "";
};

export const hasErrorsInUserData = (errObj: Errors) => {
  console.log(
    "🚀 ~ file: UserDataValidation.ts ~ line 76 ~ hasErrorsInUserData ~ hasErrorsInUserData"
  );
  if (
    errObj.confirmPassError.length === 0 &&
    errObj.emailError.length === 0 &&
    errObj.passwordError.length === 0 &&
    errObj.nameError.length === 0 &&
    errObj.contactError.length === 0
  )
    return false;
  return true;
};
